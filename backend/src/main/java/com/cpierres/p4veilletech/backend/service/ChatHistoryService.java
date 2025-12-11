package com.cpierres.p4veilletech.backend.service;

import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Mémoire de chat très simple en mémoire (process) pour conserver un contexte court par conversation.
 * Ce n'est PAS persistant et convient pour un POC/local. On limite le nombre de tours pour éviter
 * l'explosion de tokens.
 */
@Service
public class ChatHistoryService {

  private static final int MAX_TURNS = 8; // nombre d'échanges (user+assistant) conservés

  private static class Turn {
    final String user;
    final String assistant;
    Turn(String user, String assistant) { this.user = user; this.assistant = assistant; }
  }

  private final Map<String, Deque<Turn>> histories = new ConcurrentHashMap<>();

  public List<Turn> getHistory(String conversationId) {
    Deque<Turn> dq = histories.get(conversationId);
    if (dq == null) return List.of();
    return new ArrayList<>(dq);
  }

  public void append(String conversationId, String userMessage, String assistantMessage) {
    histories.compute(conversationId, (k, v) -> {
      if (v == null) v = new ArrayDeque<>();
      v.addLast(new Turn(userMessage, assistantMessage));
      while (v.size() > MAX_TURNS) {
        v.removeFirst();
      }
      return v;
    });
  }
}
