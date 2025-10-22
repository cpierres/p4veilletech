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
  public Flux<String> chat(
    @RequestParam("message") String message,
    @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang) {
    return chatRagService.chat(message, lang);
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
}

