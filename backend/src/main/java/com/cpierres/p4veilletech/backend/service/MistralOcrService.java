package com.cpierres.p4veilletech.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.file.Path;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MistralOcrService {

    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    @Value("${app.mistral.ocr.enabled:true}")
    private boolean enabled;

    @Value("${app.mistral.ocr.base-url:https://api.mistral.ai}")
    private String baseUrl;

    @Value("${app.mistral.ocr.endpoint:/v1/ocr}")
    private String endpoint;

    @Value("${app.mistral.ocr.api-key:${MISTRAL_API_CHATBOT_KEY:}}")
    private String apiKey;

    @Value("${app.mistral.ocr.model:mistral-ocr-3}")
    private String model;

    @Value("${app.mistral.ocr.file-param:document}")
    private String fileParam;

    @Value("${app.mistral.ocr.response-format:}")
    private String responseFormat;

    private static final Set<String> OCR_EXTENSIONS = Set.of("pdf", "png", "jpg", "jpeg", "tiff", "bmp");

    public boolean isEnabled() {
        return enabled && StringUtils.hasText(apiKey);
    }

    public boolean supports(Path path) {
        String name = path.getFileName().toString();
        int idx = name.lastIndexOf('.');
        String ext = (idx >= 0) ? name.substring(idx + 1).toLowerCase(Locale.ROOT) : "";
        return OCR_EXTENSIONS.contains(ext);
    }

    public Optional<String> extractText(Path filePath) {
        if (!isEnabled()) {
            return Optional.empty();
        }

        try {
            WebClient client = webClientBuilder.baseUrl(baseUrl).build();

            LinkedMultiValueMap<String, Object> bodyBuilder = new LinkedMultiValueMap<>();
            bodyBuilder.add(fileParam, new FileSystemResource(filePath.toFile()));
            bodyBuilder.add("model", model);
            if (StringUtils.hasText(responseFormat)) {
                bodyBuilder.add("response_format", responseFormat);
            }

            String response = client.post()
                    .uri(endpoint)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .headers(headers -> headers.setBearerAuth(apiKey))
                    .body(BodyInserters.fromMultipartData(bodyBuilder))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            if (!StringUtils.hasText(response)) {
                return Optional.empty();
            }

            String extracted = extractTextFromResponse(response);
            return StringUtils.hasText(extracted) ? Optional.of(extracted) : Optional.empty();
        } catch (Exception ex) {
            log.warn("[Mistral OCR] Échec OCR pour {}: {}", filePath, ex.getMessage());
            return Optional.empty();
        }
    }

    private String extractTextFromResponse(String responseBody) {
        try {
            Map<String, Object> payload = objectMapper.readValue(responseBody, Map.class);
            Object text = payload.get("text");
            if (text instanceof String s && StringUtils.hasText(s)) {
                return s;
            }
            Object content = payload.get("content");
            if (content instanceof String s && StringUtils.hasText(s)) {
                return s;
            }
            Object pages = payload.get("pages");
            if (pages instanceof List<?> list && !list.isEmpty()) {
                List<String> chunks = new ArrayList<>();
                for (Object item : list) {
                    if (item instanceof Map<?, ?> page) {
                        Object pageText = page.get("text");
                        if (pageText instanceof String s && StringUtils.hasText(s)) {
                            chunks.add(s);
                        } else if (page.get("markdown") instanceof String md && StringUtils.hasText(md)) {
                            chunks.add(md);
                        }
                    }
                }
                if (!chunks.isEmpty()) {
                    return String.join("\n\n", chunks);
                }
            }
            return responseBody;
        } catch (Exception ex) {
            return responseBody;
        }
    }
}
