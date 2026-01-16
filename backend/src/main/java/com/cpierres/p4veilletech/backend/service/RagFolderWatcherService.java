package com.cpierres.p4veilletech.backend.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static java.nio.file.StandardWatchEventKinds.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class RagFolderWatcherService {

    private final SkillDataEmbeddingService embeddingService;
    private WatchService watchService;
    private ExecutorService executor;
    private boolean running = true;

    @PostConstruct
    public void startWatcher() {
        Path rootPath = embeddingService.getFinalSkillsDataPath();
        if (rootPath == null) {
            log.warn("[RagWatcher] Impossible de démarrer la surveillance : dossier racine introuvable.");
            return;
        }

        try {
            this.watchService = FileSystems.getDefault().newWatchService();
            // Pour simplifier on surveille récursivement.
            // Note: WatchService n'est pas récursif par défaut sur tous les OS.
            // On va enregistrer le root et ses sous-dossiers existants.
            registerAll(rootPath);

            this.executor = Executors.newSingleThreadExecutor();
            this.executor.submit(() -> {
                log.info("[RagWatcher] Surveillance démarrée sur {}", rootPath);
                try {
                    while (running) {
                        WatchKey key = watchService.poll(1, TimeUnit.SECONDS);
                        if (key == null) continue;

                        Path dir = (Path) key.watchable();
                        for (WatchEvent<?> event : key.pollEvents()) {
                            WatchEvent.Kind<?> kind = event.kind();
                            if (kind == OVERFLOW) continue;

                            Path name = (Path) event.context();
                            Path child = dir.resolve(name);

                            if (child.toString().replace('\\', '/').contains("/_index/") || (child.getFileName() != null && child.getFileName().toString().equals("_index"))) {
                                continue;
                            }

                            log.info("[RagWatcher] Événement {} détecté pour {}", kind, child);

                            if (kind == ENTRY_CREATE || kind == ENTRY_MODIFY) {
                                if (Files.isDirectory(child)) {
                                    registerAll(child);
                                } else {
                                    embeddingService.indexSingleFile(child, rootPath);
                                }
                            } else if (kind == ENTRY_DELETE) {
                                // Pour la suppression, on ne peut plus vérifier si c'était un dossier ou un fichier
                                // On tente de supprimer de l'index par précaution.
                                String relPath = rootPath.relativize(child).toString();
                                embeddingService.removeFileFromIndex(relPath);
                            }
                        }
                        boolean valid = key.reset();
                        if (!valid) {
                            log.warn("[RagWatcher] Clé de surveillance invalide pour {}, arrêt de la surveillance de ce dossier.", dir);
                        }
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } catch (Exception e) {
                    log.error("[RagWatcher] Erreur dans la boucle de surveillance", e);
                }
            });

        } catch (IOException e) {
            log.error("[RagWatcher] Échec du démarrage du WatchService", e);
        }
    }

    private void registerAll(final Path start) throws IOException {
        Files.walkFileTree(start, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, java.nio.file.attribute.BasicFileAttributes attrs) throws IOException {
                if (dir.getFileName() != null && dir.getFileName().toString().equals("_index")) {
                    return FileVisitResult.SKIP_SUBTREE;
                }
                dir.register(watchService, ENTRY_CREATE, ENTRY_DELETE, ENTRY_MODIFY);
                return FileVisitResult.CONTINUE;
            }
        });
    }

    @PreDestroy
    public void stopWatcher() {
        running = false;
        if (executor != null) {
            executor.shutdownNow();
        }
        if (watchService != null) {
            try {
                watchService.close();
            } catch (IOException e) {
                log.error("[RagWatcher] Erreur lors de la fermeture du WatchService", e);
            }
        }
    }
}
