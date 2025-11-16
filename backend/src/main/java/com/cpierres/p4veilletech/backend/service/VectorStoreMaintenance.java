package com.cpierres.p4veilletech.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Opérations de maintenance directes sur la table pgvector
 * pour supprimer les anciens chunks d'un même document (clé: metadata.source).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class VectorStoreMaintenance {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.ai.vectorstore.pgvector.table-name:vector_store}")
    private String tableName;

    /**
     * Supprime tous les vecteurs dont metadata.source == source.
     * Fonctionne avec la table Spring AI pgvector par défaut
     * (colonne jsonb 'metadata').
     */
    public int deleteBySource(String source) {
        String sql = "DELETE FROM " + tableName + " WHERE metadata ->> 'source' = ?";
        int rows = jdbcTemplate.update(sql, source);
        log.info("[VectorStoreMaintenance] deleteBySource('{}') = {} lignes supprimées", source, rows);
        return rows;
    }
}
