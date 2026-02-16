package com.cpierres.p4veilletech.backend.model;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Table("chat_conversations")
public class ChatConversation {

    @Id
    private UUID id;

    private String userId;
    private String sessionId;

    private String userMessage;
    private String assistantResponse;

    private String provider;
    private String model;

    private Double temperature;
    private Double topP;
    private Integer maxTokens;
    private Integer ragTopK;
    private Double ragSimilarityThreshold;
    private Integer tokensUsed;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column("metadata")
    private String metadataJson;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Constructeurs
    public ChatConversation() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        log.debug("Nouvelle instance de ChatConversation créée avec timestamps initiaux");
    }

    public ChatConversation(String userId, String sessionId, String userMessage, String assistantResponse,
                          String provider, String model, Map<String, Object> metadata) {
        this();
        this.userId = userId;
        this.sessionId = sessionId;
        this.userMessage = userMessage;
        this.assistantResponse = assistantResponse;
        this.provider = provider;
        this.model = model;
        this.setMetadata(metadata);
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(String userMessage) {
        this.userMessage = userMessage;
    }

    public String getAssistantResponse() {
        return assistantResponse;
    }

    public void setAssistantResponse(String assistantResponse) {
        this.assistantResponse = assistantResponse;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getTopP() {
        return topP;
    }

    public void setTopP(Double topP) {
        this.topP = topP;
    }

    public Integer getMaxTokens() {
        return maxTokens;
    }

    public void setMaxTokens(Integer maxTokens) {
        this.maxTokens = maxTokens;
    }

    public Integer getRagTopK() {
        return ragTopK;
    }

    public void setRagTopK(Integer ragTopK) {
        this.ragTopK = ragTopK;
    }

    public Double getRagSimilarityThreshold() {
        return ragSimilarityThreshold;
    }

    public void setRagSimilarityThreshold(Double ragSimilarityThreshold) {
        this.ragSimilarityThreshold = ragSimilarityThreshold;
    }

    public Integer getTokensUsed() {
        return tokensUsed;
    }

    public void setTokensUsed(Integer tokensUsed) {
        this.tokensUsed = tokensUsed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Map<String, Object> getMetadata() {
        if (metadataJson == null || metadataJson.isEmpty()) {
            return Map.of();
        }
        try {
            return objectMapper.readValue(metadataJson, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            log.error("Failed to parse metadata JSON", e);
            return Map.of();
        }
    }

    public void setMetadata(Map<String, Object> metadata) {
        try {
            this.metadataJson = objectMapper.writeValueAsString(metadata);
        } catch (Exception e) {
            log.error("Failed to convert metadata to JSON", e);
            this.metadataJson = "{}";
        }
    }

    // Méthode pour obtenir le JSON brut (utile pour la base de données)
    public String getMetadataJson() {
        return metadataJson;
    }

    // Méthode pour définir le JSON brut (utile pour la base de données)
    public void setMetadataJson(String metadataJson) {
        this.metadataJson = metadataJson;
    }

    // Méthode pour mettre à jour le timestamp avant sauvegarde
    public void prePersist() {
        this.updatedAt = LocalDateTime.now();
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}
