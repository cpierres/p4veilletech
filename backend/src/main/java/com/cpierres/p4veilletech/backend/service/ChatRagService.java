package com.cpierres.p4veilletech.backend.service;

import com.cpierres.p4veilletech.backend.advisor.TokenUsageAuditAdvisor;
import com.cpierres.p4veilletech.backend.dto.AiProvider;
import com.cpierres.p4veilletech.backend.dto.ChatRequest;
import com.cpierres.p4veilletech.backend.dto.ChatResponse;
import com.cpierres.p4veilletech.backend.exception.AiProviderException;
import com.cpierres.p4veilletech.backend.model.ChatConversation;
import com.cpierres.p4veilletech.backend.repository.ChatConversationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.mistralai.MistralAiChatOptions;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@Service
public class ChatRagService {

    private final Map<AiProvider, ChatModel> chatModelMap;
    private final ChatModel defaultChatModel;
    private final Map<AiProvider, VectorStore> vectorStoreMap;
    private final ObjectProvider<VectorStore> defaultVectorStoreProvider;
    private final TokenUsageAuditAdvisor tokenUsageAuditAdvisor;
    private final ChatConversationRepository chatConversationRepository;

    public ChatRagService(
            @Qualifier("chatModelMap") Map<AiProvider, ChatModel> chatModelMap,
            @Qualifier("defaultChatModel") ChatModel defaultChatModel,
            @Qualifier("vectorStoreMap") Map<AiProvider, VectorStore> vectorStoreMap,
            ObjectProvider<VectorStore> defaultVectorStoreProvider,
            TokenUsageAuditAdvisor tokenUsageAuditAdvisor,
            ChatConversationRepository chatConversationRepository) {
        this.chatModelMap = chatModelMap;
        this.defaultChatModel = defaultChatModel;
        this.vectorStoreMap = vectorStoreMap;
        this.defaultVectorStoreProvider = defaultVectorStoreProvider;
        this.tokenUsageAuditAdvisor = tokenUsageAuditAdvisor;
        this.chatConversationRepository = chatConversationRepository;
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
        AtomicReference<String> fullResponse = new AtomicReference<>("");

        return Mono.fromCallable(() -> {
            startTime.set(System.currentTimeMillis());

            String normalized = (request.getLang() == null || request.getLang().isBlank())
                    ? "fr" : request.getLang().toLowerCase(Locale.ROOT);
            boolean french = !normalized.startsWith("en");
            String systemPrompt = french ? buildFrSystemPrompt() : buildEnSystemPrompt();

            // Sélection du provider et du modèle
            AiProvider provider = request.getAiProvider() != null ? request.getAiProvider() : AiProvider.OPENAI;
            providerUsed.set(provider);

            ChatModel chatModel = chatModelMap.get(provider);
            if (chatModel == null && request.getAiProvider() == null) {
                chatModel = defaultChatModel;
            }

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

            if (chatModel == null) {
                String msg = "Provider " + provider.getCode().toUpperCase(Locale.ROOT)
                        + " non configuré. Vérifiez les clés/API et la configuration Spring AI.";
                log.error(msg);
                return Flux.just(ChatResponse.builder()
                        .content(msg)
                        .provider(providerUsed.get().getCode())
                        .model(modelUsed.get())
                        .temperature(request.getTemperature())
                        .timestamp(Instant.now())
                        .processingTimeMs(System.currentTimeMillis() - startTime.get())
                        .build());
            }

            // Construction du ChatClient avec le modèle sélectionné
            ChatClient chatClient = ChatClient.builder(chatModel).build();

            // Configuration du RAG avec les paramètres dynamiques
            VectorStore vectorStore = vectorStoreMap.get(provider);
            if (vectorStore == null && request.getAiProvider() == null) {
                vectorStore = defaultVectorStoreProvider.getIfAvailable();
            }

            StringBuilder contentBuilder = new StringBuilder();

            var promptBuilder = chatClient.prompt()
                    .system(systemPrompt)
                    .user(userMsg)
                    .options(chatOptions);

            if (vectorStore == null) {
                log.warn("No VectorStore available; continuing without RAG context.");
                promptBuilder.advisors(tokenUsageAuditAdvisor);
            } else {
                var qaAdvisor = QuestionAnswerAdvisor.builder(vectorStore)
                        .searchRequest(SearchRequest.builder()
                                .similarityThreshold(request.getRagSimilarityThreshold() != null
                                        ? request.getRagSimilarityThreshold() : 0.4d)
                                .topK(request.getRagTopK() != null ? request.getRagTopK() : 50)
                                .build())
                        .build();
                promptBuilder.advisors(qaAdvisor, tokenUsageAuditAdvisor);
            }

            return promptBuilder.stream()
                    .content()
                    .map(chunk -> {
                        String processedChunk = chunk.replace(" ", "\u00A0");
                        contentBuilder.append(chunk);
                        fullResponse.updateAndGet(current -> current + chunk);

                        return ChatResponse.builder()
                                .content(processedChunk)
                                .provider(providerUsed.get().getCode())
                                .model(modelUsed.get())
                                .temperature(request.getTemperature())
                                .timestamp(Instant.now())
                                .processingTimeMs(System.currentTimeMillis() - startTime.get())
                                .build();
                    })
                    .doOnComplete(() -> {
                        // Sauvegarder la conversation complète dans la base de données
                        // Capturer les valeurs actuelles pour éviter les problèmes de portée
                        String finalUserMessage = request.getMessage();
                        String finalAssistantResponse = contentBuilder.toString();
                        String finalFullResponse = fullResponse.get();
                        AiProvider finalProvider = providerUsed.get();
                        String finalModel = modelUsed.get();
                        long finalProcessingTimeMs = System.currentTimeMillis() - startTime.get();

                        saveConversation(request, finalProvider, finalModel,
                                       finalUserMessage, finalAssistantResponse, finalFullResponse, finalProcessingTimeMs);
                    })
                    .onErrorMap(WebClientResponseException.TooManyRequests.class, ex -> {
                        log.error("Erreur 429 Too Many Requests pour le provider {}: {}", providerUsed.get(), ex.getMessage());
                        return new AiProviderException(
                                AiProviderException.ErrorType.RATE_LIMIT_EXCEEDED,
                                providerUsed.get() != null ? providerUsed.get().getCode() : "unknown",
                                "Crédit API épuisé. Veuillez recharger votre compte chez le fournisseur.",
                                ex
                        );
                    })
                    .onErrorMap(WebClientRequestException.class, ex -> {
                        log.error("Erreur de connexion pour le provider {}: {}", providerUsed.get(), ex.getMessage());
                        String message = ex.getMessage() != null && ex.getMessage().contains("timed out")
                                ? "Le serveur de modèles locaux n'est pas disponible. Vérifiez qu'il est démarré."
                                : "Impossible de se connecter au fournisseur d'IA. Vérifiez votre connexion.";
                        return new AiProviderException(
                                AiProviderException.ErrorType.CONNECTION_TIMEOUT,
                                providerUsed.get() != null ? providerUsed.get().getCode() : "unknown",
                                message,
                                ex
                        );
                    })
                    .onErrorMap(IllegalStateException.class, ex -> {
                        // Gérer les erreurs enveloppées (ex: "Stream processing failed")
                        Throwable cause = ex.getCause();
                        while (cause != null) {
                            if (cause instanceof WebClientRequestException wcEx) {
                                log.error("Erreur de connexion (enveloppée) pour le provider {}: {}", providerUsed.get(), wcEx.getMessage());
                                String message = wcEx.getMessage() != null && wcEx.getMessage().contains("timed out")
                                        ? "Le serveur de modèles locaux n'est pas disponible. Vérifiez qu'il est démarré."
                                        : "Impossible de se connecter au fournisseur d'IA. Vérifiez votre connexion.";
                                return new AiProviderException(
                                        AiProviderException.ErrorType.CONNECTION_TIMEOUT,
                                        providerUsed.get() != null ? providerUsed.get().getCode() : "unknown",
                                        message,
                                        wcEx
                                );
                            }
                            cause = cause.getCause();
                        }
                        // Si pas de cause connue, relancer l'exception originale
                        return ex;
                    });
        });
    }

    /**
     * Construit les options de chat selon le provider et les paramètres de la requête.
     */
    private ChatOptions buildChatOptions(ChatRequest request, AiProvider provider) {
        if (provider == AiProvider.MISTRAL) {
            // LM Studio local utilise l'API OpenAI-compatible
            var builder = OpenAiChatOptions.builder();
            String model = normalizeModelName(request.getModel());
            if (model != null) {
                builder.model(model);
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
        } else if (provider == AiProvider.MISTRAL_CLOUD) {
            // Mistral AI Cloud utilise l'API native Mistral
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
            String model = openAiOptions.getModel();
            if (provider == AiProvider.MISTRAL) {
                String normalized = normalizeModelName(model);
                return normalized != null ? normalized : "LMStudio/mistralai/ministral-3-3b";
            }
            return model != null ? model : "gpt-4o-mini";
        } else if (options instanceof MistralAiChatOptions mistralOptions) {
            return mistralOptions.getModel() != null ? mistralOptions.getModel() : "mistral-small-latest";
        }
        if (provider == AiProvider.MISTRAL) {
            return "LMStudio/mistralai/ministral-3-3b";
        } else if (provider == AiProvider.MISTRAL_CLOUD) {
            return "mistral-small-latest";
        }
        return "gpt-4o-mini";
    }

    private String normalizeModelName(String model) {
        if (model == null) {
            return null;
        }
        String trimmed = model.trim();
        if (trimmed.isEmpty()) {
            return null;
        }
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
            try {
                URI uri = URI.create(trimmed);
                String path = uri.getPath();
                if (path != null && !path.isBlank()) {
                    if (path.startsWith("/")) {
                        path = path.substring(1);
                    }
                    if (!path.isBlank()) {
                        return path;
                    }
                }
            } catch (IllegalArgumentException ex) {
                // Fall through to return the raw model string.
            }
        }
        return trimmed;
    }

    /**
     * Sauvegarde une conversation dans la base de données.
     */
    private void saveConversation(ChatRequest request, AiProvider provider, String model,
                                  String userMessage, String assistantResponse, String fullResponse, long processingTimeMs) {
        try {
            log.info("Début de la sauvegarde de la conversation pour le modèle {}", model);

            // Créer une nouvelle conversation
            ChatConversation conversation = new ChatConversation();
            // Utiliser la méthode getUserId() qui retourne 'anonymous' par défaut
            conversation.setUserId(request.getUserId());
            conversation.setSessionId(UUID.randomUUID().toString()); // Session unique
            conversation.setUserMessage(userMessage);
            conversation.setAssistantResponse(fullResponse);
            conversation.setProvider(provider.getCode());
            conversation.setModel(model);

            // Paramètres de la requête
            conversation.setTemperature(request.getTemperature());
            conversation.setTopP(request.getTopP());
            conversation.setMaxTokens(request.getMaxTokens());
            conversation.setRagTopK(request.getRagTopK());
            conversation.setRagSimilarityThreshold(request.getRagSimilarityThreshold());
            conversation.setProcessingTimeMs((int) processingTimeMs);

            // Métadonnées supplémentaires
            Map<String, Object> metadata = new HashMap<>();
            metadata.put("lang", request.getLang());
            metadata.put("aiProvider", provider.getCode());
            metadata.put("model", model);
            metadata.put("timestamp", Instant.now().toString());
            metadata.put("userMessageLength", userMessage != null ? userMessage.length() : 0);
            metadata.put("responseLength", fullResponse != null ? fullResponse.length() : 0);
            conversation.setMetadata(metadata);

            log.debug("Conversation préparée: userId={}, sessionId={}, messageLength={}, responseLength={}",
                    conversation.getUserId(), conversation.getSessionId(),
                    userMessage != null ? userMessage.length() : 0,
                    fullResponse != null ? fullResponse.length() : 0);

            // Sauvegarder de manière réactive avec gestion d'erreur améliorée
            chatConversationRepository.save(conversation)
                    .subscribeOn(Schedulers.boundedElastic())
                    .doOnNext(saved -> {
                        log.info("Conversation sauvegardée avec succès - ID: {}", saved.getId());
                        log.debug("Détails de la conversation: userId={}, model={}, provider={}",
                                saved.getUserId(), saved.getModel(), saved.getProvider());
                    })
                    .doOnError(error -> {
                        log.error("Erreur lors de la sauvegarde de la conversation dans la base de données", error);
                        // Ajouter des informations contextuelles
                        log.error("Contexte de l'erreur - userId: {}, model: {}, messageLength: {}",
                                conversation.getUserId(), model,
                                userMessage != null ? userMessage.length() : 0);
                    })
                    .subscribe(
                            saved -> {},
                            error -> {}
                    );

            log.info("Conversation enregistrée pour l'utilisateur {} avec le modèle {}",
                    conversation.getUserId(),
                    model);

        } catch (Exception e) {
            log.error("Exception inattendue lors de la sauvegarde de la conversation", e);
        }
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

    /**
     * Méthode de test pour vérifier la sauvegarde des conversations
     * Peut être appelée manuellement pour diagnostiquer les problèmes
     */
    public Mono<ChatConversation> testSaveConversation() {
        try {
            ChatRequest testRequest = ChatRequest.builder()
                    .message("Test message for debugging")
                    .lang("fr")
                    .userId("test-user")
                    .build();

            ChatConversation conversation = new ChatConversation();
            // Utiliser la méthode getUserId() qui retourne 'anonymous' par défaut
            conversation.setUserId(testRequest.getUserId());
            conversation.setSessionId(UUID.randomUUID().toString());
            conversation.setUserMessage("Test user message");
            conversation.setAssistantResponse("Test assistant response");
            conversation.setProvider("openai");
            conversation.setModel("gpt-4o-mini");
            conversation.setTemperature(0.5);

            Map<String, Object> metadata = new HashMap<>();
            metadata.put("test", "true");
            metadata.put("timestamp", Instant.now().toString());
            conversation.setMetadata(metadata);

            log.info("Test: Tentative de sauvegarde d'une conversation de test...");

            return chatConversationRepository.save(conversation)
                    .doOnNext(saved -> {
                        log.info("Test: Conversation de test sauvegardée avec succès - ID: {}", saved.getId());
                    })
                    .doOnError(error -> {
                        log.error("Test: Erreur lors de la sauvegarde de la conversation de test", error);
                    })
                    .subscribeOn(Schedulers.boundedElastic());
        } catch (Exception e) {
            log.error("Test: Exception lors de la création de la conversation de test", e);
            return Mono.error(e);
        }
    }
}
