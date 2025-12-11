package com.cpierres.p4veilletech.backend.controller;

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
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;

@RestController
@RequestMapping("/api")
public class ChatController {

  private final ChatRagService chatRagService;

  public ChatController(ChatRagService chatRagService) {
    this.chatRagService = chatRagService;
  }

//  @GetMapping("/chat")
//  public String chat(@RequestParam("message") String message,
//                     @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang) {
//    return chatRagService.chat(message, lang);
//  }

  @GetMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public ResponseEntity<Flux<String>> chat(
    @RequestParam("message") String message,
    @RequestParam(value = "conversationId", required = false, defaultValue = "") String conversationId,
    @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang) {
    // Stratégie d'alimentation du conversationId:
    // - S'il est fourni par le client (recommandé: un ID par fil de discussion), on le réutilise.
    // - S'il est absent/vide, on en génère un côté serveur et on le renvoie dans l'entête
    //   X-Conversation-Id pour que le client le persiste et le renvoie aux appels suivants.
    String effectiveConversationId = conversationId;
    if (effectiveConversationId == null || effectiveConversationId.isBlank()) {
      effectiveConversationId = java.util.UUID.randomUUID().toString();
    }

    Flux<String> stream = chatRagService.chat(effectiveConversationId, message, lang);

    return ResponseEntity
      .ok()
      .contentType(MediaType.TEXT_EVENT_STREAM)
      .header("X-Conversation-Id", effectiveConversationId)
      .body(stream);
  }

  @PostMapping(value = "/chat/transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
  public reactor.core.publisher.Mono<ResponseEntity<String>> transcribe(
      @RequestPart("file") FilePart file,
      @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang
  ) {
    // Prefer environment var OPENAI_API_KEY; fallback to system property spring.ai.openai.api-key
    String apiKey = System.getenv("OPENAI_API_KEY");
    if (apiKey == null || apiKey.isBlank()) {
      apiKey = System.getProperty("spring.ai.openai.api-key");
    }
    if (apiKey == null || apiKey.isBlank()) {
      return reactor.core.publisher.Mono.just(ResponseEntity.status(500).body("Missing OpenAI API key"));
    }

    String model = "gpt-4o-mini-transcribe"; // OpenAI speech-to-text
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
          ResponseEntity<String> response = rest.postForEntity(
              "https://api.openai.com/v1/audio/transcriptions",
              request,
              String.class
          );

          return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        }).subscribeOn(reactor.core.scheduler.Schedulers.boundedElastic()))
        .onErrorResume(ex -> reactor.core.publisher.Mono.just(ResponseEntity.status(500).body("Transcription failed")));
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
      // Prefer environment var OPENAI_API_KEY; fallback to system property spring.ai.openai.api-key
      String apiKey = System.getenv("OPENAI_API_KEY");
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

