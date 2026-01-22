package com.cpierres.p4veilletech.backend.advisor;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClientRequest;
import org.springframework.ai.chat.client.ChatClientResponse;
import org.springframework.ai.chat.client.advisor.api.CallAdvisor;
import org.springframework.ai.chat.client.advisor.api.CallAdvisorChain;
import org.springframework.ai.chat.client.advisor.api.StreamAdvisor;
import org.springframework.ai.chat.client.advisor.api.StreamAdvisorChain;
import org.springframework.ai.chat.metadata.ChatResponseMetadata;
import org.springframework.ai.chat.metadata.Usage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.core.Ordered;
import reactor.core.publisher.Flux;

import java.util.concurrent.TimeUnit;

/**
 * Advisor pour auditer l'utilisation des tokens et exposer des métriques.
 * Enregistre les tokens consommés dans les logs et dans Micrometer pour Prometheus/Grafana.
 */
public class TokenUsageAuditAdvisor implements CallAdvisor, StreamAdvisor {

    private static final Logger log = LoggerFactory.getLogger(TokenUsageAuditAdvisor.class);

    private final Counter promptTokensCounter;
    private final Counter completionTokensCounter;
    private final Counter totalTokensCounter;
    private final Timer chatDurationTimer;

    public TokenUsageAuditAdvisor(MeterRegistry meterRegistry) {
        this.promptTokensCounter = Counter.builder("ai.tokens.prompt")
                .description("Total prompt tokens consumed")
                .register(meterRegistry);
        this.completionTokensCounter = Counter.builder("ai.tokens.completion")
                .description("Total completion tokens consumed")
                .register(meterRegistry);
        this.totalTokensCounter = Counter.builder("ai.tokens.total")
                .description("Total tokens consumed")
                .register(meterRegistry);
        this.chatDurationTimer = Timer.builder("ai.chat.duration")
                .description("Chat request duration")
                .register(meterRegistry);
    }

    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 100; // Run early to capture all token usage
    }

    @Override
    public ChatClientResponse adviseCall(ChatClientRequest request, CallAdvisorChain chain) {
        long startTime = System.currentTimeMillis();

        // Execute the chain
        ChatClientResponse response = chain.nextCall(request);

        long duration = System.currentTimeMillis() - startTime;
        chatDurationTimer.record(duration, TimeUnit.MILLISECONDS);

        // Extract and log token usage
        if (response != null && response.chatResponse() != null) {
            String userPrompt = extractUserPrompt(request);
            logTokenUsage(response.chatResponse(), userPrompt, duration);
        }

        return response;
    }

    @Override
    public Flux<ChatClientResponse> adviseStream(ChatClientRequest request, StreamAdvisorChain chain) {
        long startTime = System.currentTimeMillis();
        String userPrompt = extractUserPrompt(request);

        return chain.nextStream(request)
                .doOnComplete(() -> {
                    long duration = System.currentTimeMillis() - startTime;
                    chatDurationTimer.record(duration, TimeUnit.MILLISECONDS);
                    log.debug("Stream completed in {} ms for prompt: {}", duration,
                            truncatePrompt(userPrompt));
                })
                .doOnNext(response -> {
                    // Token usage is typically available in the last chunk
                    if (response != null && response.chatResponse() != null) {
                        ChatResponseMetadata metadata = response.chatResponse().getMetadata();
                        if (metadata != null && metadata.getUsage() != null) {
                            Usage usage = metadata.getUsage();
                            if (usage.getTotalTokens() != null && usage.getTotalTokens() > 0) {
                                recordTokenMetrics(usage);
                                log.info("Stream token usage - Prompt: {}, Completion: {}, Total: {}",
                                        usage.getPromptTokens(),
                                        usage.getCompletionTokens(),
                                        usage.getTotalTokens());
                            }
                        }
                    }
                });
    }

    private String extractUserPrompt(ChatClientRequest request) {
        if (request == null || request.prompt() == null || request.prompt().getContents() == null) {
            return "unknown";
        }
        return request.prompt().getContents();
    }

    private void logTokenUsage(ChatResponse chatResponse, String userPrompt, long durationMs) {
        ChatResponseMetadata metadata = chatResponse.getMetadata();
        if (metadata == null) {
            log.warn("No metadata available in chat response");
            return;
        }

        Usage usage = metadata.getUsage();
        if (usage == null) {
            log.warn("No usage information available in chat response metadata");
            return;
        }

        // Record metrics
        recordTokenMetrics(usage);

        // Log detailed information
        String model = metadata.getModel() != null ? metadata.getModel() : "unknown";
        log.info("Token Usage Audit - Model: {}, Prompt tokens: {}, Completion tokens: {}, Total: {}, Duration: {} ms, Prompt: {}",
                model,
                usage.getPromptTokens(),
                usage.getCompletionTokens(),
                usage.getTotalTokens(),
                durationMs,
                truncatePrompt(userPrompt));
    }

    private void recordTokenMetrics(Usage usage) {
        if (usage.getPromptTokens() != null) {
            promptTokensCounter.increment(usage.getPromptTokens());
        }
        if (usage.getCompletionTokens() != null) {
            completionTokensCounter.increment(usage.getCompletionTokens());
        }
        if (usage.getTotalTokens() != null) {
            totalTokensCounter.increment(usage.getTotalTokens());
        }
    }

    private String truncatePrompt(String prompt) {
        if (prompt == null) {
            return "null";
        }
        return prompt.length() > 100 ? prompt.substring(0, 100) + "..." : prompt;
    }
}
