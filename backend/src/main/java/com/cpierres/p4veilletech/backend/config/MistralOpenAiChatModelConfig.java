package com.cpierres.p4veilletech.backend.config;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@ConditionalOnProperty(name = "spring.ai.mistral.api-key")
public class MistralOpenAiChatModelConfig {

  @Bean("mistralOpenAiChatModel")
  public OpenAiChatModel mistralOpenAiChatModel(
    @Value("${spring.ai.mistral.api-key}") String apiKey,
    @Value("${spring.ai.mistral.base-url:https://api.mistral.ai}") String baseUrl,
    @Value("${app.ai.mistral.model:mistral-small}") String defaultModel,
    @Value("${app.ai.mistral.temperature:0.7}") double defaultTemperature,
    ObjectProvider<RestClient.Builder> restClientBuilderProvider,
    WebClient.Builder webClientBuilder) {

    RestClient.Builder restClientBuilder = restClientBuilderProvider
      .getIfAvailable(RestClient::builder);

    String normalizedBaseUrl = baseUrl;
    if (normalizedBaseUrl != null) {
      if (normalizedBaseUrl.endsWith("/v1/")) {
        normalizedBaseUrl = normalizedBaseUrl.substring(0, normalizedBaseUrl.length() - 4);
      } else if (normalizedBaseUrl.endsWith("/v1")) {
        normalizedBaseUrl = normalizedBaseUrl.substring(0, normalizedBaseUrl.length() - 3);
      }
    }

    OpenAiApi openAiApi = OpenAiApi.builder()
      .apiKey(apiKey)
      .baseUrl(normalizedBaseUrl)
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
