package com.cpierres.p4veilletech.backend.service;

import com.cpierres.p4veilletech.backend.dto.AiProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.document.DocumentTransformer;
import org.springframework.ai.reader.JsonReader;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.vectorstore.VectorStore;
import com.cpierres.p4veilletech.backend.rag.JsonLoader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Formatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.EnumSet;
import java.util.Set;

@Slf4j
@Service
public class SkillDataEmbeddingService {
    private final Map<AiProvider, VectorStore> vectorStoreMap;
    private final DocumentTransformer textSplitter;
    private final JsonLoader jsonLoader;
    private final Map<AiProvider, VectorStoreMaintenance> vectorStoreMaintenanceMap;
    private final GitHubReadmeUpsertService gitHubReadmeUpsertService;
    private final com.cpierres.p4veilletech.backend.util.ContentHashIndex contentHashIndex;
    private final ResourceLoader resourceLoader;
    private final MistralOcrService mistralOcrService;
    private final Set<AiProvider> rateLimitedProviders = EnumSet.noneOf(AiProvider.class);

    public SkillDataEmbeddingService(
            @org.springframework.beans.factory.annotation.Qualifier("vectorStoreMap")
            Map<AiProvider, VectorStore> vectorStoreMap,
            DocumentTransformer textSplitter,
            JsonLoader jsonLoader,
            @org.springframework.beans.factory.annotation.Qualifier("vectorStoreMaintenanceMap")
            Map<AiProvider, VectorStoreMaintenance> vectorStoreMaintenanceMap,
            GitHubReadmeUpsertService gitHubReadmeUpsertService,
            com.cpierres.p4veilletech.backend.util.ContentHashIndex contentHashIndex,
            ResourceLoader resourceLoader,
            MistralOcrService mistralOcrService) {
        this.vectorStoreMap = vectorStoreMap;
        this.textSplitter = textSplitter;
        this.jsonLoader = jsonLoader;
        this.vectorStoreMaintenanceMap = vectorStoreMaintenanceMap;
        this.gitHubReadmeUpsertService = gitHubReadmeUpsertService;
        this.contentHashIndex = contentHashIndex;
        this.resourceLoader = resourceLoader;
        this.mistralOcrService = mistralOcrService;
    }

    @Value("${app.rag.data-path}")
    private String skillsDataPathProperty;

    @EventListener(ApplicationReadyEvent.class)
    public void indexAllSkillsData() throws IOException {
        Path finalPath = getFinalSkillsDataPath();
        if (finalPath == null) return;

        if (vectorStoreMap.isEmpty()) {
            log.warn("[Embeddings] Aucun VectorStore disponible, indexation ignorée.");
            return;
        }

        for (var entry : vectorStoreMap.entrySet()) {
            AiProvider provider = entry.getKey();
            if (rateLimitedProviders.contains(provider)) {
                log.warn("[Embeddings:{}] Rate limit détecté précédemment, indexation ignorée.", provider.getCode());
                continue;
            }
            VectorStore vectorStore = entry.getValue();
            VectorStoreMaintenance maintenance = vectorStoreMaintenanceMap.get(provider);
            if (maintenance == null) {
                log.warn("[Embeddings] Maintenance indisponible pour {}, indexation ignorée.", provider);
                continue;
            }

            log.info("[Embeddings:{}] Initialisation : génération des embeddings depuis {} ...", provider.getCode(), finalPath);

            // 0) Vérification de cohérence cache/DB : si le cache contient des entrées mais la table est vide,
            // on invalide le cache pour forcer la ré-indexation
            checkAndInvalidateCacheIfInconsistent(provider, maintenance);

            // 1) Bootstrap initial des README GitHub listés dans le fichier d'évaluations (idempotent via hash)
            try {
                int synced = gitHubReadmeUpsertService.syncAllFromEval(provider);
                log.info("[Embeddings:{}] Bootstrap GitHub README terminé: {} dépôts traités", provider.getCode(), synced);
            } catch (Exception e) {
                log.warn("[Embeddings:{}] Bootstrap GitHub README ignoré (erreur non bloquante)", provider.getCode(), e);
            }

            Files.walk(finalPath)
                .filter(path -> !path.toString().replace('\\', '/').contains("/_index/"))
                .filter(path -> !path.getFileName().toString().equals("_index"))
                .filter(Files::isRegularFile)
                .forEach(path -> indexSingleFileForProvider(path, finalPath, provider, vectorStore, maintenance));
            contentHashIndex.persist();
        }
    }

    public void indexSingleFile(Path path, Path rootPath) {
        if (vectorStoreMap.isEmpty()) {
            log.warn("[Embeddings] Aucun VectorStore disponible, indexation ignorée.");
            return;
        }
        for (var entry : vectorStoreMap.entrySet()) {
            AiProvider provider = entry.getKey();
            if (rateLimitedProviders.contains(provider)) {
                log.warn("[Embeddings:{}] Rate limit détecté précédemment, indexation ignorée.", provider.getCode());
                continue;
            }
            VectorStore vectorStore = entry.getValue();
            VectorStoreMaintenance maintenance = vectorStoreMaintenanceMap.get(provider);
            if (maintenance == null) {
                log.warn("[Embeddings] Maintenance indisponible pour {}, indexation ignorée.", provider);
                continue;
            }
            indexSingleFileForProvider(path, rootPath, provider, vectorStore, maintenance);
        }
    }

    private void indexSingleFileForProvider(Path path, Path rootPath, AiProvider provider,
            VectorStore vectorStore, VectorStoreMaintenance maintenance) {
        String relPath = rootPath.relativize(path).toString();
        try {
            String fileKey = "file:" + relPath.replace('\\', '/');
            String hashKey = provider.getCode() + ":" + fileKey;
            String sha = sha256OfFile(path);
            String previous = contentHashIndex.get(hashKey);
            if (sha != null && sha.equals(previous)) {
                log.info("[Embeddings:{}] SKIP (inchangé, pas de ré-embedding): {}", provider.getCode(), relPath);
                return; // évite consommation de tokens OpenAI
            }

            Collection<Document> docs = readWithAutoReader(path, relPath, provider);
            // Déduplication: IDs déterministes (si VectorStore les utilise) et skip si hash identique
            List<Document> toAdd = assignDeterministicIds(docs, fileKey);
            // Supprime les anciens vecteurs de ce fichier (clé = metadata.source = relPath)
            removeFileFromIndexForProvider(relPath, provider, maintenance);
            if (Files.exists(path)) {
                vectorStore.add(toAdd);
                contentHashIndex.put(hashKey, sha);
                log.info("[Embeddings:{}] Upsert effectué pour {} ({} chunks)", provider.getCode(), relPath, toAdd.size());
            } else {
                log.info("[Embeddings:{}] Fichier supprimé entre-temps, skipping add: {}", provider.getCode(), relPath);
            }
            contentHashIndex.persist();
        } catch (Throwable e) {
            if (isRateLimit(e)) {
                rateLimitedProviders.add(provider);
                log.warn("[Embeddings:{}] Rate limit détecté, arrêt de l'indexation pour ce provider.", provider.getCode());
            }
            log.error("[Embeddings:{}] Erreur lors de la lecture/vectorisation : {}", provider.getCode(), path, e);
        }
    }

    public void removeFileFromIndex(String relPath) {
        if (vectorStoreMaintenanceMap.isEmpty()) {
            log.warn("[Embeddings] Maintenance indisponible, suppression ignorée.");
            return;
        }
        for (var entry : vectorStoreMaintenanceMap.entrySet()) {
            removeFileFromIndexForProvider(relPath, entry.getKey(), entry.getValue());
        }
    }

    private void removeFileFromIndexForProvider(String relPath, AiProvider provider, VectorStoreMaintenance maintenance) {
        String sourceKey = relPath.replace('\\', '/');
        try {
            maintenance.deleteBySource(sourceKey);
            contentHashIndex.remove(provider.getCode() + ":file:" + sourceKey);
            contentHashIndex.persist();
        } catch (Exception ex) {
            log.warn("[Embeddings:{}] Impossible de supprimer les anciens chunks pour {} (continuation en upsert simple)", provider.getCode(), relPath, ex);
        }
    }

    /**
     * Vérifie la cohérence entre le cache de hash et la table vector_store.
     * Si le cache contient des entrées mais que la table est vide, le cache est invalidé
     * pour forcer une ré-indexation complète.
     * Cela évite le problème où le cache indique que les fichiers sont déjà indexés
     * alors que la base de données a été vidée ou réinitialisée.
     */
    private void checkAndInvalidateCacheIfInconsistent(AiProvider provider, VectorStoreMaintenance maintenance) {
        try {
            String prefix = provider.getCode() + ":";
            int cacheSize = contentHashIndex.countKeysWithPrefix(prefix);
            long vectorCount = maintenance.countVectors();

            log.info("[Embeddings:{}] Vérification cohérence: cache={} entrées, table={} vecteurs",
                    provider.getCode(), cacheSize, vectorCount);

            if (cacheSize > 0 && vectorCount == 0) {
                log.warn("[Embeddings:{}] INCOHÉRENCE DÉTECTÉE: le cache contient {} entrées mais la table est vide. " +
                        "Invalidation du cache pour forcer la ré-indexation.", provider.getCode(), cacheSize);
                contentHashIndex.clearByPrefix(prefix);
                contentHashIndex.persist();
                log.info("[Embeddings:{}] Cache invalidé avec succès.", provider.getCode());
            }
        } catch (Exception e) {
            log.warn("[Embeddings:{}] Impossible de vérifier la cohérence cache/DB (non bloquant): {}",
                    provider.getCode(), e.getMessage());
        }
    }

    public Path getFinalSkillsDataPath() {
        Path rawPath = getPathFromProperty(skillsDataPathProperty);
        if (rawPath == null || !Files.exists(rawPath)) {
            log.warn("[Embeddings] Le répertoire skills-data n'existe pas ou n'est pas accessible : {}", rawPath);
            return null;
        }

        // Si le chemin ne contient pas déjà skills-data et qu'un sous-répertoire skills-data existe, on l'utilise
        // (Sécurité pour l'adressage du sous-répertoire mentionné dans l'issue)
        if (!rawPath.getFileName().toString().equals("skills-data") && Files.exists(rawPath.resolve("skills-data"))) {
            return rawPath.resolve("skills-data");
        }
        return rawPath;
    }

    private Collection<Document> readWithAutoReader(Path filePath, String relPath, AiProvider provider) throws Exception {
        String ext = getExtension(filePath.getFileName().toString()).toLowerCase();
        FileSystemResource fileResource = new FileSystemResource(filePath.toFile());

        String filename = filePath.getFileName().toString();
        boolean isSpecialJson = "projets-ocr.json".equalsIgnoreCase(filename) || "udemy-training.json".equalsIgnoreCase(filename);

        Collection<Document> docs;
        Optional<String> ocrText = Optional.empty();
        if (provider == AiProvider.MISTRAL && mistralOcrService != null && mistralOcrService.supports(filePath)) {
            ocrText = mistralOcrService.extractText(filePath);
        }
        switch (ext) {
            case "pdf":
                if (ocrText.isPresent()) {
                    docs = List.of(new Document(ocrText.get()));
                } else {
                    docs = new PagePdfDocumentReader(fileResource).get();
                }
                break;
            case "md":
                docs = new TikaDocumentReader(fileResource).get();
                break;
            case "json":
                if ("projets-ocr.json".equalsIgnoreCase(filename)) {
                    docs = jsonLoader.parseProjetsOcr(fileResource);
                } else if ("udemy-training.json".equalsIgnoreCase(filename)) {
                    docs = jsonLoader.parseUdemyTrainings(fileResource);
                } else {
                    docs = new JsonReader(fileResource).get();
                }
                break;
            default:
                if (ocrText.isPresent()) {
                    docs = List.of(new Document(ocrText.get()));
                } else {
                    docs = new TikaDocumentReader(fileResource).get();
                }
        }

        List<Document> outDocs = new ArrayList<>();
        for (Document doc : docs) {
            doc.getMetadata().put("source", relPath.replace('\\', '/'));
            // Pas de split sur les JSON spéciaux (OCR/udemy)
            if (isSpecialJson) {
                outDocs.add(doc);
            } else {
                outDocs.addAll(textSplitter.apply(List.of(doc)));
            }
        }
        return outDocs;
    }

    private String getExtension(String filename) {
        int idx = filename.lastIndexOf('.');
        return (idx != -1) ? filename.substring(idx + 1) : "";
    }

  private Path getPathFromProperty(String pathProperty) {
    try {
      if (pathProperty.startsWith("classpath:")) {
        Resource resource = resourceLoader.getResource(pathProperty);
        if (resource.exists()) {
          return resource.getFile().toPath();
        }
      } else {
        return Paths.get(pathProperty);
      }
    } catch (Exception e) {
      log.error("[Embeddings] Erreur d’accès au chemin : {}", pathProperty, e);
    }
    return null;
  }

    // ----------------------------------------------------------------------
    // Déduplication & IDs déterministes
    // ----------------------------------------------------------------------
    private List<Document> assignDeterministicIds(Collection<Document> docs, String fileKey) throws Exception {
        List<Document> list = new ArrayList<>(docs);
        String srcHash = sha1Hex(fileKey);
        for (int i = 0; i < list.size(); i++) {
            Document d = list.get(i);
            String base = d.getFormattedContent() != null ? d.getFormattedContent() : String.valueOf(d.hashCode());
            String chunkHash = sha1Hex(base);
            String id = srcHash + ":" + i + ":" + chunkHash.substring(0, 12);
            // Certaines versions de Spring AI n'exposent pas setId(); on se contente d'un ID déterministe conceptuel.
            // Si votre implémentation de VectorStore supporte setId, on pourra l'utiliser ici pour un vrai upsert.
        }
        return list;
    }

    private String sha256OfFile(Path path) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            try (var is = Files.newInputStream(path);
                 var dis = new java.security.DigestInputStream(is, md)) {
                byte[] buffer = new byte[64 * 1024]; // 64 KiB bufferized read to avoid large direct buffers
                while (dis.read(buffer) != -1) {
                    // streaming read; md updated by DigestInputStream
                }
            }
            byte[] digest = md.digest();
            return toHex(digest);
        } catch (Exception e) {
            log.warn("[Embeddings] Impossible de calculer le SHA-256 pour {}", path, e);
            return null;
        }
    }

    private String sha1Hex(String data) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-1");
        byte[] digest = md.digest(data.getBytes(StandardCharsets.UTF_8));
        return toHex(digest);
    }

    private String toHex(byte[] bytes) {
        try (Formatter formatter = new Formatter(Locale.ROOT)) {
            for (byte b : bytes) {
                formatter.format("%02x", b);
            }
            return formatter.toString();
        }
    }

    private boolean isRateLimit(Throwable e) {
        Throwable cur = e;
        while (cur != null) {
            String msg = cur.getMessage();
            if (msg != null && msg.contains("Rate limit exceeded")) {
                return true;
            }
            cur = cur.getCause();
        }
        return false;
    }
}
