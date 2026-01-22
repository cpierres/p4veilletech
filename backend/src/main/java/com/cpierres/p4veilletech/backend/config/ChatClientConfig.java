package com.cpierres.p4veilletech.backend.config;

import com.cpierres.p4veilletech.backend.advisors.TokenUsageAuditAdvisor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;

@Slf4j
@Configuration
public class ChatClientConfig {

  @Bean("openAiChatClient")
  @ConditionalOnBean(name = "openAiChatModel")
  public ChatClient openAiChatClient(@Qualifier("openAiChatModel") ChatModel chatModel,
                                     @Value("${app.ai.chat.model:gpt-4.1-mini}") String defaultModel,
                                     @Value("${app.ai.chat.temperature:0.7}") double defaultTemperature) {
    log.info("Création du bean openAiChatClient ZZ");
    ChatOptions chatOptions = ChatOptions.builder()
      .model(defaultModel)
      .temperature(defaultTemperature)
      .build();

    return ChatClient.builder(chatModel)
      .defaultOptions(chatOptions)
      .defaultAdvisors(List.of(new SimpleLoggerAdvisor(), new TokenUsageAuditAdvisor()))
      .build();
  }

  @Bean("mistralChatClient")
  //@ConditionalOnClass(name = "org.springframework.ai.openai.OpenAiChatModel")
  @ConditionalOnBean(name = "mistralOpenAiChatModel")
  public ChatClient mistralChatClient(@Qualifier("mistralOpenAiChatModel") ChatModel chatModel,
                                      @Value("${app.ai.mistral.model:mistral-small-latest}") String defaultModel,
                                      @Value("${app.ai.mistral.temperature:0.7}") double defaultTemperature) {
    ChatOptions chatOptions = ChatOptions.builder()
      .model(defaultModel)
      .temperature(defaultTemperature)
      .build();

    return ChatClient.builder(chatModel)
      .defaultOptions(chatOptions)
      .defaultAdvisors(List.of(new SimpleLoggerAdvisor(), new TokenUsageAuditAdvisor()))
      .build();
  }
}
