package com.cpierres.p4veilletech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour les requêtes de chat avec paramètres dynamiques.
 * Permet à l'utilisateur de configurer le fournisseur, le modèle et les options.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    /**
     * Message de l'utilisateur
     */
    private String message;

    /**
     * Langue de réponse (fr, en)
     */
    @Builder.Default
    private String lang = "fr";

    /**
     * Fournisseur d'IA (openai, mistral)
     */
    @Builder.Default
    private String provider = "openai";

    /**
     * Modèle spécifique à utiliser (optionnel, utilise le défaut du provider si non spécifié)
     * Exemples: gpt-4o-mini, gpt-4o, mistral-small-latest, mistral-large-latest
     */
    private String model;

    /**
     * Température (0.0 à 2.0) - contrôle la créativité des réponses
     * Plus bas = plus déterministe, plus haut = plus créatif
     */
    private Double temperature;

    /**
     * Top-K sampling - limite le nombre de tokens considérés
     */
    private Integer topK;

    /**
     * Top-P (nucleus sampling) - probabilité cumulative des tokens
     */
    private Double topP;

    /**
     * Nombre maximum de tokens dans la réponse
     */
    private Integer maxTokens;

    /**
     * Nombre de documents à récupérer du RAG
     */
    @Builder.Default
    private Integer ragTopK = 12;

    /**
     * Seuil de similarité pour le RAG (0.0 à 1.0)
     */
    @Builder.Default
    private Double ragSimilarityThreshold = 0.4;

    /**
     * Domaine de données RAG à interroger (skills-data, ai-data, etc.)
     */
    @Builder.Default
    private String ragDomain = "skills-data";

    public AiProvider getAiProvider() {
        return AiProvider.fromCode(this.provider);
    }
}
