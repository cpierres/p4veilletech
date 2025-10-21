package com.cpierres.p4veilletech.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRagService {

    private final ChatClient.Builder chatClientBuilder;
    private final VectorStore vectorStore;

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

  public Mono<String> chat(String userMessage, String lang) {
    return Mono.fromCallable(() -> {
      // Tout ce code sera exécuté sur un thread bloquant dédié
      String normalized = (lang == null || lang.isBlank()) ? "fr" : lang.toLowerCase(Locale.ROOT);
      boolean french = !normalized.startsWith("en");
      String system = french ? buildFrSystemPrompt() : buildEnSystemPrompt();

      // Appel bloquant à la vector store
      List<Document> docs = vectorStore.similaritySearch(
        SearchRequest.builder().query(userMessage).topK(6).build()
      );

      log.debug("Nombre de documents trouvés : " + docs.size());
      if (docs.isEmpty()) {
        log.debug("Aucun document trouvé pour la requête : " + userMessage);
      } else {
        docs.forEach(d -> log.debug("Document : " + d.getFormattedContent()));
      }

      String context = docs.stream()
        .map(d -> "Source: " + d.getMetadata().getOrDefault("source", "unknown") + "\n" + getDocText(d))
        .collect(Collectors.joining("\n\n---\n\n"));
      String user = french
        ? "Question de l'utilisateur: " + userMessage + "\n\nContexte RAG (extraits de mon CV/expériences):\n" + context
        : "User question: " + userMessage + "\n\nRAG context (snippets from my CV/experience):\n" + context;
      Message sysMsg = new SystemMessage(system);
      Message usrMsg = new UserMessage(user);
      ChatClient chatClient = chatClientBuilder.build();

      // Appel bloquant au chat client
      return chatClient.prompt()
        .messages(sysMsg, usrMsg)
        .call()
        .content();
    }).subscribeOn(Schedulers.boundedElastic());
  }

    private String getDocText(Document d) {
        try {
            // Spring AI 1.0.x uses getContent(), older snapshots used getText()
            return (String) Document.class.getMethod("getContent").invoke(d);
        } catch (Exception e) {
            try {
                return (String) Document.class.getMethod("getText").invoke(d);
            } catch (Exception ex) {
                return String.valueOf(d);
            }
        }
    }

    private String buildFrSystemPrompt() {
        return String.join("\n",
                "Tu es un chatbot francophone spécialisé pour répondre sur le parcours et l'expérience professionnelle de Christophe PIERRES.",
                "Utilise un ton professionnel, clair et concis.",
                "Base tes réponses PRIORITAIREMENT sur le contexte fourni (RAG) provenant de la base vectorielle.",
                "Si l'information n'est pas disponible dans le contexte, indique-le poliment et propose de reformuler.",
                "Inclue la source (champ 'source' s'il est présent) quand c'est pertinent.",
                "Réponds en français par défaut.");
    }

    private String buildEnSystemPrompt() {
        return String.join("\n",
                "You are an English-speaking chatbot that answers questions about Christophe PIERRES' professional background.",
                "Use a professional, clear and concise tone.",
                "Ground your answers PRIMARILY on the provided RAG context from the vector database.",
                "If the information is not available, say so politely and suggest a rephrasing.",
                "Include the source (the 'source' metadata) when relevant.",
                "Answer in English.");
    }
}
