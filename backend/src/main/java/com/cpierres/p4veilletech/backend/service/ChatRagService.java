package com.cpierres.p4veilletech.backend.service;

import com.cpierres.p4veilletech.backend.advisor.TokenUsageAuditAdvisor;
import com.cpierres.p4veilletech.backend.dto.AiProvider;
import com.cpierres.p4veilletech.backend.dto.ChatRequest;
import com.cpierres.p4veilletech.backend.dto.ChatResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.mistralai.MistralAiChatOptions;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.Instant;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@Service
public class ChatRagService {

    private final Map<AiProvider, ChatModel> chatModelMap;
    private final ChatModel defaultChatModel;
    private final VectorStore vectorStore;
    private final TokenUsageAuditAdvisor tokenUsageAuditAdvisor;

    public ChatRagService(
            @Qualifier("chatModelMap") Map<AiProvider, ChatModel> chatModelMap,
            @Qualifier("defaultChatModel") ChatModel defaultChatModel,
            VectorStore vectorStore,
            TokenUsageAuditAdvisor tokenUsageAuditAdvisor) {
        this.chatModelMap = chatModelMap;
        this.defaultChatModel = defaultChatModel;
        this.vectorStore = vectorStore;
        this.tokenUsageAuditAdvisor = tokenUsageAuditAdvisor;
    }

    /**
     * Chat simple avec langue (rétrocompatibilité).
     */
    public Flux<String> chat(String userMessage, String lang) {
        ChatRequest request = ChatRequest.builder()
                .message(userMessage)
                .lang(lang)
                .build();
        return chatWithOptions(request).map(ChatResponse::getContent);
    }

    /**
     * Chat avancé avec tous les paramètres dynamiques.
     * Retourne un Flux de ChatResponse avec métadonnées.
     */
    public Flux<ChatResponse> chatWithOptions(ChatRequest request) {
        AtomicLong startTime = new AtomicLong();
        AtomicReference<String> modelUsed = new AtomicReference<>();
        AtomicReference<AiProvider> providerUsed = new AtomicReference<>();

        return Mono.fromCallable(() -> {
            startTime.set(System.currentTimeMillis());

            String normalized = (request.getLang() == null || request.getLang().isBlank())
                    ? "fr" : request.getLang().toLowerCase(Locale.ROOT);
            boolean french = !normalized.startsWith("en");
            String systemPrompt = french ? buildFrSystemPrompt() : buildEnSystemPrompt();

            // Sélection du provider et du modèle
            AiProvider provider = request.getAiProvider();
            providerUsed.set(provider);

            ChatModel chatModel = chatModelMap.getOrDefault(provider, defaultChatModel);

            // Construction des options dynamiques
            ChatOptions chatOptions = buildChatOptions(request, provider);
            modelUsed.set(extractModelName(chatOptions, provider));

            log.info("Chat request - Provider: {}, Model: {}, Temperature: {}, RAG topK: {}",
                    provider, modelUsed.get(), request.getTemperature(), request.getRagTopK());

            return new Object[] { systemPrompt, request.getMessage(), chatModel, chatOptions, provider };
        })
        .subscribeOn(Schedulers.boundedElastic())
        .flatMapMany(data -> {
            String systemPrompt = (String) data[0];
            String userMsg = (String) data[1];
            ChatModel chatModel = (ChatModel) data[2];
            ChatOptions chatOptions = (ChatOptions) data[3];
            AiProvider provider = (AiProvider) data[4];

            // Construction du ChatClient avec le modèle sélectionné
            ChatClient chatClient = ChatClient.builder(chatModel).build();

            // Configuration du RAG avec les paramètres dynamiques
            var qaAdvisor = QuestionAnswerAdvisor.builder(vectorStore)
                    .searchRequest(SearchRequest.builder()
                            .similarityThreshold(request.getRagSimilarityThreshold() != null
                                    ? request.getRagSimilarityThreshold() : 0.4d)
                            .topK(request.getRagTopK() != null ? request.getRagTopK() : 12)
                            .build())
                    .build();

            StringBuilder contentBuilder = new StringBuilder();

            return chatClient.prompt()
                    .system(systemPrompt)
                    .user(userMsg)
                    .options(chatOptions)
                    .advisors(qaAdvisor, tokenUsageAuditAdvisor)
                    .stream()
                    .content()
                    .map(chunk -> {
                        String processedChunk = chunk.replace(" ", "\u00A0");
                        contentBuilder.append(chunk);

                        return ChatResponse.builder()
                                .content(processedChunk)
                                .provider(providerUsed.get().getCode())
                                .model(modelUsed.get())
                                .temperature(request.getTemperature())
                                .timestamp(Instant.now())
                                .processingTimeMs(System.currentTimeMillis() - startTime.get())
                                .build();
                    });
        });
    }

    /**
     * Construit les options de chat selon le provider et les paramètres de la requête.
     */
    private ChatOptions buildChatOptions(ChatRequest request, AiProvider provider) {
        if (provider == AiProvider.MISTRAL) {
            var builder = MistralAiChatOptions.builder();
            if (request.getModel() != null && !request.getModel().isBlank()) {
                builder.model(request.getModel());
            }
            if (request.getTemperature() != null) {
                builder.temperature(request.getTemperature());
            }
            if (request.getTopP() != null) {
                builder.topP(request.getTopP());
            }
            if (request.getMaxTokens() != null) {
                builder.maxTokens(request.getMaxTokens());
            }
            return builder.build();
        } else {
            // OpenAI par défaut
            var builder = OpenAiChatOptions.builder();
            if (request.getModel() != null && !request.getModel().isBlank()) {
                builder.model(request.getModel());
            }
            if (request.getTemperature() != null) {
                builder.temperature(request.getTemperature());
            }
            if (request.getTopP() != null) {
                builder.topP(request.getTopP());
            }
            // Note: OpenAI n'a pas de topK, on l'ignore pour ce provider
            if (request.getMaxTokens() != null) {
                builder.maxCompletionTokens(request.getMaxTokens());
            }
            return builder.build();
        }
    }

    private String extractModelName(ChatOptions options, AiProvider provider) {
        if (options instanceof OpenAiChatOptions openAiOptions) {
            return openAiOptions.getModel() != null ? openAiOptions.getModel() : "gpt-4o-mini";
        } else if (options instanceof MistralAiChatOptions mistralOptions) {
            return mistralOptions.getModel() != null ? mistralOptions.getModel() : "mistral-small-latest";
        }
        return provider == AiProvider.MISTRAL ? "mistral-small-latest" : "gpt-4o-mini";
    }

    private String buildFrSystemPrompt() {
        return String.join("\n",
                "Tu es un chatbot francophone spécialisé pour répondre sur le parcours et l'expérience professionnelle de Christophe Pierrès.",
                "Utilise un ton professionnel.",
                "Base tes réponses PRIORITAIREMENT sur le contexte fourni (RAG) provenant de la base vectorielle.",
                "Si la question demande une liste complète (par exemple, 'liste tous les projets'), utilise TOUS les documents fournis dans le contexte, même s'ils sont nombreux.",
                "Si l'information n'est pas disponible dans le contexte, indique-le poliment et propose de reformuler.",
                "Inclue la source (champ 'source' s'il est présent) quand c'est pertinent.",
                "Réponds en français par défaut.");
    }

    private String buildEnSystemPrompt() {
        return String.join("\n",
                "You are an English-speaking chatbot that answers questions about Christophe Pierrès' professional background.",
                "Use a professional, clear and concise tone.",
                "Ground your answers PRIMARILY on the provided RAG context from the vector database.",
                "If the information is not available, say so politely and suggest a rephrasing.",
                "Include the source (the 'source' metadata) when relevant.",
                "Answer in English.");
    }
}
