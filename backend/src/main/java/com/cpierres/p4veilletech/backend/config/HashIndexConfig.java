package com.cpierres.p4veilletech.backend.config;

import com.cpierres.p4veilletech.backend.util.ContentHashIndex;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Déclare un bean singleton {@link ContentHashIndex} pour l'ensemble de l'application.
 *
 * Chemin configurable par propriété / variable d'environnement:
 * - app.content-hash-index.path
 * - ou CONTENT_HASH_INDEX_PATH (priorité équivalente via le placeholder ci-dessous)
 *
 * Si aucun chemin n'est fourni, la classe utilise ses fallbacks internes:
 *   backend/data/..., ./data/..., ${user.home}/.p4veilletech/...
 */
@Configuration
@Slf4j
public class HashIndexConfig {

    @Bean
    public ContentHashIndex contentHashIndex(
            @Value("${app.content-hash-index.path:${CONTENT_HASH_INDEX_PATH:}}") String configuredPath
    ) {
        if (configuredPath != null && !configuredPath.isBlank()) {
            Path target = Paths.get(configuredPath);
            log.info("[HashIndexConfig] Utilisation du chemin configuré pour ContentHashIndex: {}", target);
            return new ContentHashIndex(target);
        }
        log.info("[HashIndexConfig] Aucun chemin configuré, utilisation des fallbacks internes de ContentHashIndex");
        return new ContentHashIndex();
    }
}
