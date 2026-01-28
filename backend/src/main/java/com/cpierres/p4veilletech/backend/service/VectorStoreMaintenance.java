package com.cpierres.p4veilletech.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Opérations de maintenance directes sur la table pgvector
 * pour supprimer les anciens chunks d'un même document (clé: metadata.source).
 */
@Slf4j
public class VectorStoreMaintenance {

    private final JdbcTemplate jdbcTemplate;
    private final String tableName;

    public VectorStoreMaintenance(JdbcTemplate jdbcTemplate, String tableName) {
        this.jdbcTemplate = jdbcTemplate;
        this.tableName = tableName;
    }

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

    /**
     * Compte le nombre total de vecteurs dans la table.
     * Utilisé pour vérifier la cohérence entre le cache de hash et la base de données.
     */
    public long countVectors() {
        String sql = "SELECT COUNT(*) FROM " + tableName;
        Long count = jdbcTemplate.queryForObject(sql, Long.class);
        return count != null ? count : 0L;
    }
}
