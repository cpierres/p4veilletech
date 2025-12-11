package com.cpierres.p4veilletech.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRagService {

    private final ChatClient.Builder chatClientBuilder;
    private final VectorStore vectorStore;
    private final ChatHistoryService chatHistoryService;

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

  public Flux<String> chat(String conversationId, String userMessage, String lang) {
    return Mono.fromCallable(() -> {
      String normalized = (lang == null || lang.isBlank()) ? "fr" : lang.toLowerCase(Locale.ROOT);
      boolean french = !normalized.startsWith("en");
      String baseSystem = french ? buildFrSystemPrompt() : buildEnSystemPrompt();

      // Récupérer l'historique existant pour enrichir le contexte du système
      String historyBlock = formatHistory(conversationId, french);
      String systemPrompt = historyBlock.isBlank() ? baseSystem : baseSystem + "\n\n" + historyBlock;

      return new Object[] { systemPrompt, userMessage, french, conversationId };
    })
    .subscribeOn(Schedulers.boundedElastic())
    .flatMapMany(data -> {
      String systemPrompt = (String) data[0];
      String userMsg = (String) data[1];
      boolean french = (boolean) data[2];
      String convId = (String) data[3];

      StringBuilder fullAnswer = new StringBuilder(1024);

      // Utilisation de l'API moderne avec QuestionAnswerAdvisor
      ChatClient chatClient = chatClientBuilder.build();
      var qaAdvisor = QuestionAnswerAdvisor.builder(vectorStore)
        .searchRequest(SearchRequest.builder().similarityThreshold(0.4d).topK(12).build())
        .build();

      return chatClient.prompt()
        .system(systemPrompt)
        .user(userMsg)
        .advisors(qaAdvisor)
        .stream()
        .content()
        .map(chunk -> chunk.replace(" ", "\u00A0")) // Remplace les espaces par insécable
        .doOnNext(ch -> fullAnswer.append(ch))
        .doOnComplete(() -> {
          if (convId != null && !convId.isBlank()) {
            try {
              chatHistoryService.append(convId, userMsg, fullAnswer.toString());
            } catch (Exception e) {
              log.warn("Impossible d'ajouter au ChatHistory: {}", e.getMessage());
            }
          }
        });
    });
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

    private String formatHistory(String conversationId, boolean french) {
        if (conversationId == null || conversationId.isBlank()) return "";
        var turns = chatHistoryService.getHistory(conversationId);
        if (turns.isEmpty()) return "";
        String title = french ? "Historique récent de la conversation (contexte) :" : "Recent conversation history (context):";
        StringBuilder sb = new StringBuilder(title).append('\n');
        for (Object o : turns) {
            // o est de type ChatHistoryService.Turn mais interne; on accède via toString si besoin
            try {
                var userField = o.getClass().getDeclaredField("user");
                userField.setAccessible(true);
                var assistantField = o.getClass().getDeclaredField("assistant");
                assistantField.setAccessible(true);
                String u = (String) userField.get(o);
                String a = (String) assistantField.get(o);
                sb.append("- ").append(french ? "Utilisateur: " : "User: ").append(u).append('\n');
                sb.append("  ").append(french ? "Assistant: " : "Assistant: ").append(a).append('\n');
            } catch (Exception ignored) {}
        }
        return sb.toString();
    }
}
