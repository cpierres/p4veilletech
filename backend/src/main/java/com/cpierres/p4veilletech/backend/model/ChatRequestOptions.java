package com.cpierres.p4veilletech.backend.model;

public record ChatRequestOptions(
  String model,
  Double temperature,
  Integer topK,
  Double similarityThreshold
) {
  public static ChatRequestOptions empty() {
    return new ChatRequestOptions(null, null, null, null);
  }
}
