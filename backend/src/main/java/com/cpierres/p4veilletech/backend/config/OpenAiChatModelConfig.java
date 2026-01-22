package com.cpierres.p4veilletech.backend.config;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@ConditionalOnProperty(name = "spring.ai.openai.api-key")
public class OpenAiChatModelConfig {

  @Bean("openAiChatModel")
  @ConditionalOnMissingBean(name = "openAiChatModel")
  public OpenAiChatModel openAiChatModel(
    @Value("${spring.ai.openai.api-key}") String apiKey,
    @Value("${spring.ai.openai.base-url:https://api.openai.com}") String baseUrl,
    @Value("${app.ai.chat.model:gpt-4.1-mini}") String defaultModel,
    @Value("${app.ai.chat.temperature:0.7}") double defaultTemperature,
    ObjectProvider<RestClient.Builder> restClientBuilderProvider,
    WebClient.Builder webClientBuilder) {

    RestClient.Builder restClientBuilder = restClientBuilderProvider
      .getIfAvailable(RestClient::builder);

    OpenAiApi openAiApi = OpenAiApi.builder()
      .apiKey(apiKey)
      .baseUrl(baseUrl)
      .restClientBuilder(restClientBuilder)
      .webClientBuilder(webClientBuilder)
      .build();

    OpenAiChatOptions defaultOptions = OpenAiChatOptions.builder()
      .model(defaultModel)
      .temperature(defaultTemperature)
      .build();

    return OpenAiChatModel.builder()
      .openAiApi(openAiApi)
      .defaultOptions(defaultOptions)
      .build();
  }
}
