package com.cpierres.p4veilletech.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.document.DocumentReader;
import org.springframework.ai.document.DocumentTransformer;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
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

    private final EmbeddingModel embeddingModel;
    private final VectorStore vectorStore;
    private final ResourceLoader resourceLoader;
    private final DocumentTransformer textSplitter;

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
            vectorStore.add(allDocs);
        } else {
            log.warn("[Embeddings] Aucun document trouvé pour vectorisation.");
        }
    }

    private Collection<Document> readWithAutoReader(Path filePath, String relPath) throws Exception {
        String ext = getExtension(filePath.getFileName().toString()).toLowerCase();
        // Spring AI 1.0.3 : les readers consomment une Resource, pas un Path
        FileSystemResource fileResource = new FileSystemResource(filePath.toFile());
        DocumentReader reader;
        switch (ext) {
            case "pdf":
                reader = new PagePdfDocumentReader(fileResource);
                break;
            case "md":
            case "json":
            default:
                reader = new TikaDocumentReader(fileResource);
        }
        Collection<Document> docs = reader.get();
        List<Document> splitDocs = new ArrayList<>();
        for (Document doc : docs) {
            doc.getMetadata().put("source", relPath);
            splitDocs.addAll(textSplitter.apply(List.of(doc)));
        }
        //return docs;
      return splitDocs;
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
