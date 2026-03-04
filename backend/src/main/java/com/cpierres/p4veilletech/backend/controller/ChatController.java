package com.cpierres.p4veilletech.backend.controller;

import com.cpierres.p4veilletech.backend.dto.ChatRequest;
import com.cpierres.p4veilletech.backend.dto.ChatResponse;
import com.cpierres.p4veilletech.backend.exception.AiProviderException;
import com.cpierres.p4veilletech.backend.service.ChatRagService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Flux;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api")
public class ChatController {

  private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

  private final ChatRagService chatRagService;

  @Value("${app.mistral.transcription.api-key:}")
  private String mistralApiKey;

  @Value("${app.mistral.transcription.base-url:https://api.mistral.ai}")
  private String mistralBaseUrl;

  @Value("${app.mistral.transcription.model:voxtral-mini-transcribe-26-02}")
  private String mistralModel;

  @Value("${spring.ai.openai.api-key:}")
  private String openAiApiKey;

  @Value("${spring.ai.openai.base-url:https://api.openai.com}")
  private String openAiBaseUrl;

  public ChatController(ChatRagService chatRagService) {
    this.chatRagService = chatRagService;
  }

  /**
   * Endpoint simple GET pour rétrocompatibilité.
   */
  @GetMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<String> chat(
    @RequestParam("message") String message,
    @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang) {
    return chatRagService.chat(message, lang);
  }

  /**
   * Endpoint avancé POST avec tous les paramètres dynamiques.
   * Permet de choisir le provider (openai/mistral), le modèle, la température, etc.
   */
  @PostMapping(value = "/chat/advanced", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<ChatResponse> chatAdvanced(@RequestBody ChatRequest request) {
    return chatRagService.chatWithOptions(request)
        .onErrorResume(AiProviderException.class, ex -> Flux.just(
            ChatResponse.builder()
                .error(true)
                .errorType(ex.getErrorType().name())
                .errorMessage(ex.getUserMessage())
                .provider(ex.getProvider())
                .build()
        ));
  }

  /**
   * Endpoint GET avancé avec paramètres en query string (alternative au POST).
   */
  @GetMapping(value = "/chat/advanced", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<ChatResponse> chatAdvancedGet(
    @RequestParam("message") String message,
    @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang,
    @RequestParam(value = "provider", required = false, defaultValue = "openai") String provider,
    @RequestParam(value = "model", required = false) String model,
    @RequestParam(value = "temperature", required = false) Double temperature,
    @RequestParam(value = "topP", required = false) Double topP,
    @RequestParam(value = "topK", required = false) Integer topK,
    @RequestParam(value = "maxTokens", required = false) Integer maxTokens,
    @RequestParam(value = "ragTopK", required = false, defaultValue = "30") Integer ragTopK,
    @RequestParam(value = "ragSimilarityThreshold", required = false, defaultValue = "0.4") Double ragSimilarityThreshold,
    @RequestParam(value = "userId", required = false) String userId) {

    ChatRequest request = ChatRequest.builder()
        .message(message)
        .lang(lang)
        .provider(provider)
        .model(model)
        .temperature(temperature)
        .topP(topP)
        .topK(topK)
        .maxTokens(maxTokens)
        .ragTopK(ragTopK)
        .ragSimilarityThreshold(ragSimilarityThreshold)
        .userId(userId)
        .build();

    return chatRagService.chatWithOptions(request)
        .onErrorResume(AiProviderException.class, ex -> Flux.just(
            ChatResponse.builder()
                .error(true)
                .errorType(ex.getErrorType().name())
                .errorMessage(ex.getUserMessage())
                .provider(ex.getProvider())
                .build()
        ));
  }

  @PostMapping(value = "/chat/transcribe/mistral", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
  public reactor.core.publisher.Mono<ResponseEntity<String>> transcribeMistral(
      @RequestPart("file") FilePart file,
      @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang
  ) {
    // Récupérer la clé API Mistral
    String apiKey = mistralApiKey;
    if (apiKey == null || apiKey.isBlank()) {
        apiKey = System.getenv("MISTRAL_TRANSCRIPTION_API_KEY");
    }

    if (apiKey == null || apiKey.isBlank()) {
      logger.error("Mistral transcription API key is missing");
      return reactor.core.publisher.Mono.just(ResponseEntity.status(500).body("Missing Mistral API key"));
    }

    String model = mistralModel;
    String language = (lang == null || lang.isBlank()) ? "fr" : lang;

    // Préparer les variables pour l'utilisation dans les lambdas
    final String fApiKey = apiKey;
    final String fModel = model;
    final String fLanguage = language;
    final String fFileName = file.filename();

    // Lire le fichier audio
    return DataBufferUtils.join(file.content())
        .map(joined -> {
          byte[] bytes = new byte[joined.readableByteCount()];
          joined.read(bytes);
          DataBufferUtils.release(joined);
          return bytes;
        })
        .flatMap(bytes -> reactor.core.publisher.Mono.fromCallable(() -> {
          logger.info("Starting Mistral transcription request. File: {}, Model: {}, Language: {}", fFileName, fModel, fLanguage);

          RestTemplate rest = new RestTemplate();

          HttpHeaders headers = new HttpHeaders();
          headers.setBearerAuth(fApiKey);
          headers.setContentType(MediaType.MULTIPART_FORM_DATA);

          MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
          ByteArrayResource fileAsResource = new ByteArrayResource(bytes) {
            @Override
            public String getFilename() {
              String name = fFileName;
              return (name == null || name.isBlank()) ? "audio.webm" : name;
            }
          };

          body.add("file", fileAsResource);
          body.add("model", fModel);
          body.add("response_format", "json"); // On garde JSON car l'API Mistral renvoie du JSON
          body.add("language", fLanguage);

          HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);

          String url = mistralBaseUrl + "/v1/audio/transcriptions";
          logger.debug("Sending request to Mistral API: {}", url);

          ResponseEntity<String> response = rest.postForEntity(url, request, String.class);

          logger.info("Mistral API response status: {}, body: {}", response.getStatusCode(), response.getBody());

          if (response.getStatusCode().is2xxSuccessful()) {
            String bodyStr = response.getBody();
            if (bodyStr != null && bodyStr.contains("\"text\"")) {
                try {
                    // Extraction simple sans dépendance JSON lourde
                    Pattern pattern = Pattern.compile("\"text\"\\s*:\\s*\"([^\"]+)\"");
                    Matcher matcher = pattern.matcher(bodyStr);
                    if (matcher.find()) {
                        return ResponseEntity.status(response.getStatusCode()).body(matcher.group(1));
                    }
                } catch (Exception e) {
                    logger.warn("Failed to parse Mistral JSON response using regex", e);
                }
            }
            return ResponseEntity.status(response.getStatusCode()).body(bodyStr);
          } else {
            logger.error("Mistral API error: Status {}, Response: {}", response.getStatusCode(), response.getBody());
            return ResponseEntity.status(response.getStatusCode()).body("Error from Mistral API: " + response.getBody());
          }
        }).subscribeOn(reactor.core.scheduler.Schedulers.boundedElastic()))
        .onErrorResume(ex -> {
          logger.error("Transcription failed with exception", ex);
          return reactor.core.publisher.Mono.just(ResponseEntity.status(500).body("Transcription failed: " + ex.getMessage()));
        });
  }

  @PostMapping(value = "/chat/transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
  public reactor.core.publisher.Mono<ResponseEntity<String>> transcribe(
      @RequestPart("file") FilePart file,
      @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang,
      @RequestParam(value = "provider", required = false, defaultValue = "openai") String provider
  ) {
    if ("mistral".equals(provider) || "mistral-cloud".equals(provider)) {
      return transcribeMistral(file, lang);
    } else {
      // Prefer environment var OPENAI_CHATBOT_KEY; fallback to system property spring.ai.openai.api-key
      String apiKey = openAiApiKey;
      if (apiKey == null || apiKey.isBlank()) {
          apiKey = System.getenv("OPENAI_CHATBOT_KEY");
      }

      if (apiKey == null || apiKey.isBlank()) {
        return reactor.core.publisher.Mono.just(ResponseEntity.status(500).body("Missing OpenAI API key"));
      }

      String model = "whisper-1"; // OpenAI speech-to-text
      String language = (lang == null || lang.isBlank()) ? "fr" : lang;

      // Prepare effectively-final copies for lambda usage
      final String fApiKey = apiKey;
      final String fModel = model;
      final String fLanguage = language;
      final String fFileName = file.filename();

      // Read the uploaded file bytes (WebFlux FilePart) reactively
      return DataBufferUtils.join(file.content())
          .map(joined -> {
            byte[] bytes = new byte[joined.readableByteCount()];
            joined.read(bytes);
            DataBufferUtils.release(joined);
            return bytes;
          })
          .flatMap(bytes -> reactor.core.publisher.Mono.fromCallable(() -> {
            RestTemplate rest = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(fApiKey);
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            // Wrap bytes in a ByteArrayResource with filename to ensure boundary has a filename
            ByteArrayResource fileAsResource = new ByteArrayResource(bytes) {
              @Override
              public String getFilename() {
                String name = fFileName;
                return (name == null || name.isBlank()) ? "audio.webm" : name;
              }
            };

            body.add("file", fileAsResource);
            body.add("model", fModel);
            body.add("response_format", "text");
            body.add("language", fLanguage);

            HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
            String url = openAiBaseUrl + "/v1/audio/transcriptions";
            ResponseEntity<String> response = rest.postForEntity(
                url,
                request,
                String.class
            );

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
          }).subscribeOn(reactor.core.scheduler.Schedulers.boundedElastic()))
          .onErrorResume(ex -> reactor.core.publisher.Mono.just(ResponseEntity.status(500).body("Transcription failed")));
    }
  }
  @GetMapping(value = "/chat/tts")
  public ResponseEntity<byte[]> tts(
      @RequestParam("text") String text,
      @RequestParam(value = "voice", required = false, defaultValue = "alloy") String voice,
      @RequestParam(value = "format", required = false, defaultValue = "mp3") String format,
      @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang
  ) {
    try {
      if (text == null || text.isBlank()) {
        return ResponseEntity.badRequest().body(new byte[0]);
      }
      // Prefer environment var OPENAI_CHATBOT_KEY; fallback to system property spring.ai.openai.api-key
      String apiKey = System.getenv("OPENAI_CHATBOT_KEY");
      if (apiKey == null || apiKey.isBlank()) {
        apiKey = System.getProperty("spring.ai.openai.api-key");
      }
      if (apiKey == null || apiKey.isBlank()) {
        return ResponseEntity.status(500).body(new byte[0]);
      }

      String model = "gpt-4o-mini-tts"; // OpenAI text-to-speech

      RestTemplate rest = new RestTemplate();
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(apiKey);
      headers.setContentType(MediaType.APPLICATION_JSON);
      // Prefer mp3 for wide support
      if ("mp3".equalsIgnoreCase(format)) {
        headers.set(HttpHeaders.ACCEPT, "audio/mpeg");
      }

      String json = String.format("{\n  \"model\": \"%s\",\n  \"input\": %s,\n  \"voice\": %s,\n  \"format\": %s\n}",
          model,
          toJson(text),
          toJson(voice),
          toJson(format));

      HttpEntity<String> request = new HttpEntity<>(json, headers);
      ResponseEntity<byte[]> response = rest.postForEntity(
          "https://api.openai.com/v1/audio/speech",
          request,
          byte[].class
      );

      MediaType contentType = MediaType.APPLICATION_OCTET_STREAM;
      if ("mp3".equalsIgnoreCase(format)) {
        contentType = MediaType.parseMediaType("audio/mpeg");
      } else if ("wav".equalsIgnoreCase(format)) {
        contentType = MediaType.parseMediaType("audio/wav");
      } else if ("ogg".equalsIgnoreCase(format) || "opus".equalsIgnoreCase(format)) {
        contentType = MediaType.parseMediaType("audio/ogg");
      }

      return ResponseEntity.status(response.getStatusCode())
          .contentType(contentType)
          .body(response.getBody());

    } catch (Exception ex) {
      return ResponseEntity.status(500).body(new byte[0]);
    }
  }

  // Minimal JSON escaper for building small payloads without extra deps
  private static String toJson(String s) {
    if (s == null) return "null";
    String escaped = s
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
        .replace("\n", "\\n")
        .replace("\r", "\\r");
    return "\"" + escaped + "\"";
  }
}

