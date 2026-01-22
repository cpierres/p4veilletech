package com.cpierres.p4veilletech.backend.service;

import com.cpierres.p4veilletech.backend.model.ChatAuditRecord;
import com.cpierres.p4veilletech.backend.model.ChatRequestOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.ObjectProvider;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.OffsetDateTime;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRagService {

    @Qualifier("openAiChatClient")
    private final ObjectProvider<ChatClient> openAiChatClient;
    @Qualifier("mistralChatClient")
    private final ObjectProvider<ChatClient> mistralChatClient;
    private final VectorStore vectorStore;
    private final ChatAuditService chatAuditService;

    @Value("${app.ai.chat.model:gpt-4.1-mini}")
    private String defaultModel;

    @Value("${app.ai.chat.temperature:0.7}")
    private Double defaultTemperature;

//    public String chat(String userMessage, String lang) {
//        String normalized = (lang == null || lang.isBlank()) ? "fr" : lang.toLowerCase(Locale.ROOT);
//        boolean french = !normalized.startsWith("en");
//
//        String system = french ? buildFrSystemPrompt() : buildEnSystemPrompt();
//
//        // Retrieve top documents from vector store
//        List<Document> docs = vectorStore.similaritySearch(
//                SearchRequest.builder().query(userMessage).topK(6).build()
//        );
//
//        String context = docs.stream()
//                .map(d -> "Source: " + d.getMetadata().getOrDefault("source", "unknown") + "\n" + getDocText(d))
//                .collect(Collectors.joining("\n\n---\n\n"));
//
//        String user = french
//                ? "Question de l'utilisateur: " + userMessage + "\n\nContexte RAG (extraits de mon CV/expériences):\n" + context
//                : "User question: " + userMessage + "\n\nRAG context (snippets from my CV/experience):\n" + context;
//
//        Message sysMsg = new SystemMessage(system);
//        Message usrMsg = new UserMessage(user);
//
//        ChatClient chatClient = chatClientBuilder.build();
//        return chatClient.prompt()
//                .messages(sysMsg, usrMsg)
//                .call()
//                .content();
//    }

  public Flux<String> chat(String userMessage, String lang, ChatRequestOptions options) {
    return Mono.fromCallable(() -> {
      String normalized = (lang == null || lang.isBlank()) ? "fr" : lang.toLowerCase(Locale.ROOT);
      boolean french = !normalized.startsWith("en");
      String systemPrompt = french ? buildFrSystemPrompt() : buildEnSystemPrompt();
      ChatRequestOptions safeOptions = (options == null) ? ChatRequestOptions.empty() : options;

      return new Object[] { systemPrompt, userMessage, french, safeOptions, normalized };
    })
    .subscribeOn(Schedulers.boundedElastic())
    .flatMapMany(data -> {
      String systemPrompt = (String) data[0];
      String userMsg = (String) data[1];
      boolean french = (boolean) data[2];
      ChatRequestOptions requestOptions = (ChatRequestOptions) data[3];
      String normalizedLang = (String) data[4];

      boolean listQuery = isListQuery(userMsg, french);
      int resolvedTopK = resolveTopK(requestOptions, listQuery);
      Double resolvedThreshold = resolveThreshold(requestOptions, listQuery);
      String resolvedModel = resolveModel(requestOptions);
      Double resolvedTemperature = resolveTemperature(requestOptions);

      SearchRequest.Builder searchBuilder = SearchRequest.builder()
        .topK(resolvedTopK);
      if (resolvedThreshold != null) {
        searchBuilder.similarityThreshold(resolvedThreshold);
      }

      var qaAdvisor = QuestionAnswerAdvisor.builder(vectorStore)
        .searchRequest(searchBuilder.build())
        .build();

      ChatOptions chatOptions = buildChatOptions(requestOptions);
      StringBuilder responseBuffer = new StringBuilder();

      ChatClient selectedChatClient = resolveChatClient(resolvedModel);
      var promptSpec = selectedChatClient.prompt()
        .system(systemPrompt)
        .user(userMsg)
        .advisors(qaAdvisor);

      if (chatOptions != null) {
        promptSpec.options(chatOptions);
      }

      return promptSpec.stream()
        .content()
        .doOnNext(responseBuffer::append)
        .doFinally(signalType -> persistAudit(userMsg, responseBuffer.toString(), resolvedModel,
          resolvedTemperature, resolvedTopK, resolvedThreshold, normalizedLang))
        .map(chunk -> chunk.replace(" ", "\u00A0")); // Remplace les espaces par insécable;
    });
  }

  private ChatClient resolveChatClient(String resolvedModel) {
    if (resolvedModel != null && resolvedModel.toLowerCase(Locale.ROOT).startsWith("mistral")) {
      ChatClient client = mistralChatClient.getIfAvailable();
      if (client == null) {
        throw new IllegalStateException("Mistral n'est pas configuré (MISTRAL_API_KEY manquante ou bean absent)." );
      }
      return client;
    }
    ChatClient openAiClient = openAiChatClient.getIfAvailable();
    if (openAiClient == null) {
      throw new IllegalStateException("OpenAI n'est pas configuré (OPENAI_API_KEY manquante ou bean absent)." );
    }
    return openAiClient;
  }

  private ChatOptions buildChatOptions(ChatRequestOptions requestOptions) {
    if (requestOptions.model() == null && requestOptions.temperature() == null) {
      return null;
    }
    ChatOptions.Builder builder = ChatOptions.builder();
    if (requestOptions.model() != null && !requestOptions.model().isBlank()) {
      builder.model(requestOptions.model());
    }
    if (requestOptions.temperature() != null) {
      builder.temperature(requestOptions.temperature());
    }
    return builder.build();
  }

  private int resolveTopK(ChatRequestOptions requestOptions, boolean listQuery) {
    int baseTopK = (requestOptions.topK() != null && requestOptions.topK() > 0) ? requestOptions.topK() : 12;
    if (listQuery && baseTopK < 16) {
      return 16;
    }
    return baseTopK;
  }

  private Double resolveThreshold(ChatRequestOptions requestOptions, boolean listQuery) {
    if (listQuery) {
      return null;
    }
    return requestOptions.similarityThreshold() != null ? requestOptions.similarityThreshold() : 0.4d;
  }

  private boolean isListQuery(String message, boolean french) {
    if (message == null) {
      return false;
    }
    String normalized = message.toLowerCase(Locale.ROOT);
    if (french) {
      return normalized.contains("liste") || normalized.contains("lister") || normalized.contains("tous les");
    }
    return normalized.contains("list") || normalized.contains("all ");
  }

  private String resolveModel(ChatRequestOptions requestOptions) {
    if (requestOptions.model() == null || requestOptions.model().isBlank()) {
      return defaultModel;
    }
    return requestOptions.model();
  }

  private Double resolveTemperature(ChatRequestOptions requestOptions) {
    if (requestOptions.temperature() == null) {
      return defaultTemperature;
    }
    return requestOptions.temperature();
  }

  private void persistAudit(String question, String response, String model, Double temperature,
                            Integer topK, Double similarityThreshold, String lang) {
    Mono.fromRunnable(() -> chatAuditService.save(new ChatAuditRecord(
      question,
      response,
      model,
      temperature,
      topK,
      similarityThreshold,
      lang,
      OffsetDateTime.now()
    )))
      .subscribeOn(Schedulers.boundedElastic())
      .doOnError(error -> log.warn("Echec persistance audit chat", error))
      .subscribe();
  }

    private String buildFrSystemPrompt() {
        return String.join("\n",
                "Tu es un chatbot francophone spécialisé pour répondre sur le parcours et l'expérience professionnelle de Christophe Pierrès.",
                //"Utilise un ton professionnel, clair et concis.",
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
