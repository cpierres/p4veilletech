package com.cpierres.p4veilletech.backend.config;

import com.cpierres.p4veilletech.backend.advisor.TokenUsageAuditAdvisor;
import com.cpierres.p4veilletech.backend.dto.AiProvider;
import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.mistralai.MistralAiChatModel;
import org.springframework.ai.mistralai.MistralAiEmbeddingModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiEmbeddingModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.Map;
import java.util.Optional;

/**
 * Configuration multi-fournisseurs pour les modèles de chat et d'embedding.
 * Permet de sélectionner dynamiquement entre OpenAI et MistralAI.
 */
@Configuration
public class MultiProviderAiConfig {

    private static final Logger log = LoggerFactory.getLogger(MultiProviderAiConfig.class);

    @Autowired(required = false)
    private OpenAiChatModel openAiChatModel;

    @Autowired(required = false)
    @Qualifier("lmStudioMistralChatModel")
    private OpenAiChatModel lmStudioMistralChatModel;

    @Autowired(required = false)
    private OpenAiEmbeddingModel openAiEmbeddingModel;

    @Autowired(required = false)
    private MistralAiChatModel mistralAiChatModel;

    @Autowired(required = false)
    private MistralAiEmbeddingModel mistralAiEmbeddingModel;

    /**
     * Bean pour l'advisor d'audit des tokens.
     */
    @Bean
    public TokenUsageAuditAdvisor tokenUsageAuditAdvisor(MeterRegistry meterRegistry) {
        return new TokenUsageAuditAdvisor(meterRegistry);
    }

    /**
     * Map des ChatModels disponibles par fournisseur.
     */
    @Bean
    @Qualifier("chatModelMap")
    public Map<AiProvider, ChatModel> chatModelMap() {
        var builder = new java.util.HashMap<AiProvider, ChatModel>();

        if (openAiChatModel != null) {
            builder.put(AiProvider.OPENAI, openAiChatModel);
            log.info("OpenAI ChatModel registered");
        }

        if (lmStudioMistralChatModel != null) {
            builder.put(AiProvider.MISTRAL, lmStudioMistralChatModel);
            log.info("LM Studio Mistral ChatModel registered");
        }

        if (mistralAiChatModel != null) {
            builder.put(AiProvider.MISTRAL_CLOUD, mistralAiChatModel);
            log.info("Mistral AI Cloud ChatModel registered");
        }

        if (builder.isEmpty()) {
            log.warn("No ChatModel available! Please configure at least one AI provider.");
        }

        return Map.copyOf(builder);
    }

    /**
     * Map des EmbeddingModels disponibles par fournisseur.
     */
    @Bean
    @Qualifier("embeddingModelMap")
    public Map<AiProvider, EmbeddingModel> embeddingModelMap() {
        var builder = new java.util.HashMap<AiProvider, EmbeddingModel>();

        if (openAiEmbeddingModel != null) {
            builder.put(AiProvider.OPENAI, openAiEmbeddingModel);
            log.info("OpenAI EmbeddingModel registered");
        }

        if (mistralAiEmbeddingModel != null) {
            builder.put(AiProvider.MISTRAL, mistralAiEmbeddingModel);
            log.info("MistralAI EmbeddingModel registered");
        }

        if (builder.isEmpty()) {
            log.warn("No EmbeddingModel available! Please configure at least one AI provider.");
        }

        return Map.copyOf(builder);
    }

    /**
     * ChatModel par défaut (OpenAI si disponible, sinon Mistral).
     */
    @Bean
    @Primary
    @Qualifier("defaultChatModel")
    public ChatModel defaultChatModel() {
        if (openAiChatModel != null) {
            log.info("Default ChatModel: OpenAI");
            return openAiChatModel;
        }
        if (lmStudioMistralChatModel != null) {
            log.info("Default ChatModel: LM Studio Mistral");
            return lmStudioMistralChatModel;
        }
        throw new IllegalStateException("No ChatModel available. Please configure OPENAI_CHATBOT_KEY or LMStudio settings.");
    }

    /**
     * EmbeddingModel par défaut (OpenAI si disponible, sinon Mistral).
     */
    @Bean
    @Primary
    @Qualifier("defaultEmbeddingModel")
    public EmbeddingModel defaultEmbeddingModel() {
        if (openAiEmbeddingModel != null) {
            log.info("Default EmbeddingModel: OpenAI");
            return openAiEmbeddingModel;
        }
        if (mistralAiEmbeddingModel != null) {
            log.info("Default EmbeddingModel: MistralAI");
            return mistralAiEmbeddingModel;
        }
        throw new IllegalStateException("No EmbeddingModel available. Please configure OPENAI_CHATBOT_KEY or MISTRAL_API_KEY.");
    }

    /**
     * Récupère le ChatModel pour un fournisseur donné.
     */
    public Optional<ChatModel> getChatModel(AiProvider provider) {
        return Optional.ofNullable(chatModelMap().get(provider));
    }

    /**
     * Récupère l'EmbeddingModel pour un fournisseur donné.
     */
    public Optional<EmbeddingModel> getEmbeddingModel(AiProvider provider) {
        return Optional.ofNullable(embeddingModelMap().get(provider));
    }
}
