package com.cpierres.p4veilletech.backend.config;

import io.micrometer.observation.ObservationRegistry;
import org.springframework.ai.model.SimpleApiKey;
import org.springframework.ai.model.tool.DefaultToolExecutionEligibilityPredicate;
import org.springframework.ai.model.tool.ToolCallingManager;
import org.springframework.ai.model.tool.ToolExecutionEligibilityPredicate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class LmStudioMistralConfig {

    @Bean
    @Qualifier("lmStudioMistralChatModel")
    public OpenAiChatModel lmStudioMistralChatModel(
            @Value("${app.lmstudio.base-url:http://192.168.10.1:1234}") String baseUrl,
            @Value("${app.lmstudio.api-key:lmstudio}") String apiKey,
            @Value("${app.lmstudio.mistral.model:LMStudio/mistralai/ministral-3-3b}") String model,
            @Value("${app.lmstudio.mistral.temperature:0.5}") Double temperature,
            ToolCallingManager toolCallingManager,
            RetryTemplate retryTemplate,
            ObjectProvider<ObservationRegistry> observationRegistry,
            ObjectProvider<ToolExecutionEligibilityPredicate> toolExecutionEligibilityPredicate,
            ObjectProvider<RestClient.Builder> restClientBuilderProvider,
            ObjectProvider<WebClient.Builder> webClientBuilderProvider,
            ResponseErrorHandler responseErrorHandler) {

        OpenAiApi openAiApi = OpenAiApi.builder()
                .baseUrl(baseUrl)
                .apiKey(new SimpleApiKey(apiKey))
                .headers(new LinkedMultiValueMap<>())
                .completionsPath("/v1/chat/completions")
                .embeddingsPath("/v1/embeddings")
                .restClientBuilder(restClientBuilderProvider.getIfAvailable(RestClient::builder))
                .webClientBuilder(webClientBuilderProvider.getIfAvailable(WebClient::builder))
                .responseErrorHandler(responseErrorHandler)
                .build();

        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .model(model)
                .temperature(temperature)
                .build();

        return OpenAiChatModel.builder()
                .openAiApi(openAiApi)
                .defaultOptions(options)
                .toolCallingManager(toolCallingManager)
                .toolExecutionEligibilityPredicate(
                        toolExecutionEligibilityPredicate.getIfUnique(DefaultToolExecutionEligibilityPredicate::new))
                .retryTemplate(retryTemplate)
                .observationRegistry(observationRegistry.getIfUnique(() -> ObservationRegistry.NOOP))
                .build();
    }
}
