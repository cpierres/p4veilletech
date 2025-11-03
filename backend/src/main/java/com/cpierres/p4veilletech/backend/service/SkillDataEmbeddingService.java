package com.cpierres.p4veilletech.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.document.DocumentReader;
import org.springframework.ai.document.DocumentTransformer;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.reader.JsonReader;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import com.cpierres.p4veilletech.backend.rag.JsonLoader;
import com.cpierres.p4veilletech.backend.rag.JsonLoader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SkillDataEmbeddingService {
    private final VectorStore vectorStore;
    private final DocumentTransformer textSplitter;
    private final JsonLoader jsonLoader;

  @Value("classpath:skills-data")
    private Resource skillsDataResource;

    @EventListener(ApplicationReadyEvent.class)
    public void indexAllSkillsData() throws IOException {
        log.info("[Embeddings] Initialisation : génération des embeddings OpenAI depuis skills-data ...");
        Path skillsDataPath = getFilePathFromResource(skillsDataResource);
        if (skillsDataPath == null || !Files.exists(skillsDataPath)) {
            log.warn("[Embeddings] Le répertoire skills-data n'existe pas ou n'est pas accessible : {}", skillsDataPath);
            return;
        }
        List<Document> allDocs = new ArrayList<>();
        Files.walk(skillsDataPath)
                .filter(Files::isRegularFile)
                .forEach(path -> {
                    String relPath = skillsDataPath.relativize(path).toString();
                    try {
                        allDocs.addAll(readWithAutoReader(path, relPath));
                        log.info("[Embeddings] Fichier ajouté à la vectorisation : {}", relPath);
                    } catch (Throwable e) {
                        log.error("[Embeddings] Erreur lors de la lecture/vectorisation : {}", path, e);
                    }
                });
        if (!allDocs.isEmpty()) {
            log.info("[Embeddings] Génération des embeddings et stockage dans vectorstore ({} documents)", allDocs.size());
            allDocs.forEach(doc -> log.info("CPI [Embeddings] Document : {}", doc.getFormattedContent()));
            vectorStore.add(allDocs);
        } else {
            log.warn("[Embeddings] Aucun document trouvé pour vectorisation.");
        }
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
}
