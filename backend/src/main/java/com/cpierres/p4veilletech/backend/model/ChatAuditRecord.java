package com.cpierres.p4veilletech.backend.model;

import java.time.OffsetDateTime;

public record ChatAuditRecord(
  String question,
  String response,
  String model,
  Double temperature,
  Integer topK,
  Double similarityThreshold,
  String lang,
  OffsetDateTime createdAt
) {
}
