package com.cpierres.p4veilletech.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class SkillDataEmbeddingService {
    private final VectorStore vectorStore;
    private final DocumentTransformer textSplitter;
    private final JsonLoader jsonLoader;
    private final VectorStoreMaintenance vectorStoreMaintenance;
    private final GitHubReadmeUpsertService gitHubReadmeUpsertService;
    private final com.cpierres.p4veilletech.backend.util.ContentHashIndex contentHashIndex;

  @Value("classpath:skills-data")
    private Resource skillsDataResource;

    @EventListener(ApplicationReadyEvent.class)
    public void indexAllSkillsData() throws IOException {
        log.info("[Embeddings] Initialisation : génération des embeddings OpenAI depuis skills-data ...");
        // 0) Bootstrap initial des README GitHub listés dans le fichier d'évaluations (idempotent via hash)
        try {
            int synced = gitHubReadmeUpsertService.syncAllFromEval();
            log.info("[Embeddings] Bootstrap GitHub README terminé: {} dépôts traités", synced);
        } catch (Exception e) {
            log.warn("[Embeddings] Bootstrap GitHub README ignoré (erreur non bloquante)", e);
        }
        Path skillsDataPath = getFilePathFromResource(skillsDataResource);
        if (skillsDataPath == null || !Files.exists(skillsDataPath)) {
            log.warn("[Embeddings] Le répertoire skills-data n'existe pas ou n'est pas accessible : {}", skillsDataPath);
            return;
        }
        int addedDocs = 0;
        Files.walk(skillsDataPath)
            .filter(Files::isRegularFile)
            .forEach(path -> {
                String relPath = skillsDataPath.relativize(path).toString();
                try {
                    String fileKey = "file:" + relPath.replace('\\', '/');
                    String sha = sha256OfFile(path);
                    String previous = contentHashIndex.get(fileKey);
                    if (sha != null && sha.equals(previous)) {
                        log.info("[Embeddings] SKIP (inchangé, pas de ré-embedding): {}", relPath);
                        return; // évite consommation de tokens OpenAI
                    }

                    Collection<Document> docs = readWithAutoReader(path, relPath);
                    // Déduplication: IDs déterministes (si VectorStore les utilise) et skip si hash identique
                    List<Document> toAdd = assignDeterministicIds(docs, fileKey);
                    // Supprime les anciens vecteurs de ce fichier (clé = metadata.source = relPath)
                    try {
                        vectorStoreMaintenance.deleteBySource(relPath.replace('\\', '/'));
                    } catch (Exception ex) {
                        log.warn("[Embeddings] Impossible de supprimer les anciens chunks pour {} (continuation en upsert simple)", relPath, ex);
                    }
                    vectorStore.add(toAdd);
                    contentHashIndex.put(fileKey, sha);
                    log.info("[Embeddings] Upsert effectué pour {} ({} chunks)", relPath, toAdd.size());
                } catch (Throwable e) {
                    log.error("[Embeddings] Erreur lors de la lecture/vectorisation : {}", path, e);
                }
            });
        contentHashIndex.persist();
    }

    private Collection<Document> readWithAutoReader(Path filePath, String relPath) throws Exception {
        String ext = getExtension(filePath.getFileName().toString()).toLowerCase();
        FileSystemResource fileResource = new FileSystemResource(filePath.toFile());

        String filename = filePath.getFileName().toString();
        boolean isSpecialJson = "projets-ocr.json".equalsIgnoreCase(filename) || "udemy-training.json".equalsIgnoreCase(filename);

        Collection<Document> docs;
        switch (ext) {
            case "pdf":
                docs = new PagePdfDocumentReader(fileResource).get();
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
                docs = new TikaDocumentReader(fileResource).get();
        }

        List<Document> outDocs = new ArrayList<>();
        for (Document doc : docs) {
            doc.getMetadata().put("source", relPath);
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

    private Path getFilePathFromResource(Resource resource) {
        try {
            if (resource.exists()) {
                return resource.getFile().toPath();
            }
        } catch (Exception e) {
            log.error("[Embeddings] Erreur d’accès à skills-data", e);
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
}
