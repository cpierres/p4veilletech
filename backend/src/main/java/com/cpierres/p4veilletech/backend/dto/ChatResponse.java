package com.cpierres.p4veilletech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * DTO pour les réponses de chat avec métadonnées.
 * Inclut les informations sur le modèle utilisé, les tokens consommés, etc.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {

    /**
     * Contenu de la réponse
     */
    private String content;

    /**
     * Fournisseur utilisé
     */
    private String provider;

    /**
     * Modèle utilisé
     */
    private String model;

    /**
     * Nombre de tokens en entrée (prompt)
     */
    private Long promptTokens;

    /**
     * Nombre de tokens en sortie (completion)
     */
    private Long completionTokens;

    /**
     * Nombre total de tokens
     */
    private Long totalTokens;

    /**
     * Température utilisée
     */
    private Double temperature;

    /**
     * Nombre de documents RAG récupérés
     */
    private Integer ragDocumentsCount;

    /**
     * Timestamp de la réponse
     */
    @Builder.Default
    private Instant timestamp = Instant.now();

    /**
     * Durée de traitement en millisecondes
     */
    private Long processingTimeMs;
}
