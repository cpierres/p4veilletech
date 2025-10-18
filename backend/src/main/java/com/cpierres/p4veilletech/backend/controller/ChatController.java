package com.cpierres.p4veilletech.backend.controller;

import com.cpierres.p4veilletech.backend.service.ChatRagService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

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

  @GetMapping("/chat")
  public Mono<String> chat(
    @RequestParam("message") String message,
    @RequestParam(value = "lang", required = false, defaultValue = "fr") String lang) {
    return chatRagService.chat(message, lang);
  }
}

