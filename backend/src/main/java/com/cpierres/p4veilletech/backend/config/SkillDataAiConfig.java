package com.cpierres.p4veilletech.backend.config;

import org.springframework.ai.document.DocumentTransformer;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SkillDataAiConfig {

  @Bean
  public DocumentTransformer textSplitter() {
    return new TokenTextSplitter();
  }
}
