package com.cpierres.p4veilletech.backend.service;

import com.cpierres.p4veilletech.backend.model.ChatAuditRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatAuditService {

  private final JdbcTemplate jdbcTemplate;

  public void save(ChatAuditRecord record) {
    if (record == null) {
      return;
    }
    jdbcTemplate.update(
      """
        INSERT INTO ai_chat_audit
        (question, response, model, temperature, top_k, similarity_threshold, lang, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
      record.question(),
      record.response(),
      record.model(),
      record.temperature(),
      record.topK(),
      record.similarityThreshold(),
      record.lang(),
      record.createdAt()
    );
  }
}
