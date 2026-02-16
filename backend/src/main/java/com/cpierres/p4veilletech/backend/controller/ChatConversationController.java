package com.cpierres.p4veilletech.backend.controller;

import com.cpierres.p4veilletech.backend.model.ChatConversation;
import com.cpierres.p4veilletech.backend.repository.ChatConversationRepository;
import com.cpierres.p4veilletech.backend.service.ChatRagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Slf4j

@RestController
@RequestMapping("/api/chat/conversations")
public class ChatConversationController {

    private final ChatConversationRepository chatConversationRepository;
    private final ChatRagService chatRagService;

    public ChatConversationController(ChatConversationRepository chatConversationRepository,
                                     ChatRagService chatRagService) {
        this.chatConversationRepository = chatConversationRepository;
        this.chatRagService = chatRagService;
    }

    /**
     * Récupérer toutes les conversations d'un utilisateur
     */
    @GetMapping("/user/{userId}")
    public Flux<ChatConversation> getConversationsByUser(@PathVariable String userId) {
        // Utiliser 'anonymous' comme valeur par défaut pour la cohérence avec le frontend
        String effectiveUserId = (userId != null && !userId.isBlank()) ? userId : "anonymous";
        return chatConversationRepository.findByUserIdOrderByCreatedAtDesc(effectiveUserId);
    }

    /**
     * Récupérer les 10 dernières conversations d'un utilisateur
     */
    @GetMapping("/user/{userId}/recent")
    public Flux<ChatConversation> getRecentConversationsByUser(@PathVariable String userId) {
        // Utiliser 'anonymous' comme valeur par défaut pour la cohérence avec le frontend
        String effectiveUserId = (userId != null && !userId.isBlank()) ? userId : "anonymous";
        return chatConversationRepository.findTop10ByUserIdOrderByCreatedAtDesc(effectiveUserId);
    }

    /**
     * Récupérer les conversations par session
     */
    @GetMapping("/session/{sessionId}")
    public Flux<ChatConversation> getConversationsBySession(@PathVariable String sessionId) {
        return chatConversationRepository.findBySessionId(sessionId);
    }

    /**
     * Récupérer une conversation spécifique par ID
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<ChatConversation>> getConversationById(@PathVariable UUID id) {
        return chatConversationRepository.findById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    /**
     * Supprimer une conversation par ID
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteConversation(@PathVariable UUID id) {
        return chatConversationRepository.deleteById(id)
                .then(Mono.<ResponseEntity<Void>>just(ResponseEntity.noContent().build()))
                .onErrorResume(e -> Mono.<ResponseEntity<Void>>just(createVoidResponseEntity(404)));
    }

    private ResponseEntity<Void> createVoidResponseEntity(int statusCode) {
        return ResponseEntity.status(statusCode).build();
    }

    /**
     * Supprimer toutes les conversations d'une session
     */
    @DeleteMapping("/session/{sessionId}")
    public Mono<ResponseEntity<Void>> deleteConversationsBySession(@PathVariable String sessionId) {
        return chatConversationRepository.deleteBySessionId(sessionId)
                .then(Mono.<ResponseEntity<Void>>just(ResponseEntity.noContent().build()))
                .onErrorResume(e -> Mono.<ResponseEntity<Void>>just(createVoidResponseEntity(500)));
    }

    /**
     * Supprimer toutes les conversations d'un utilisateur
     */
    @DeleteMapping("/user/{userId}")
    public Mono<ResponseEntity<Void>> deleteConversationsByUser(@PathVariable String userId) {
        // Utiliser 'anonymous' comme valeur par défaut pour la cohérence avec le frontend
        String effectiveUserId = (userId != null && !userId.isBlank()) ? userId : "anonymous";
        return chatConversationRepository.deleteByUserId(effectiveUserId)
                .then(Mono.<ResponseEntity<Void>>just(ResponseEntity.noContent().build()))
                .onErrorResume(e -> Mono.<ResponseEntity<Void>>just(createVoidResponseEntity(500)));
    }

    /**
     * Compter le nombre de conversations d'un utilisateur
     */
    @GetMapping("/user/{userId}/count")
    public Mono<Long> countConversationsByUser(@PathVariable String userId) {
        // Utiliser 'anonymous' comme valeur par défaut pour la cohérence avec le frontend
        String effectiveUserId = (userId != null && !userId.isBlank()) ? userId : "anonymous";
        return chatConversationRepository.countByUserId(effectiveUserId);
    }

    /**
     * Endpoint de test pour vérifier la sauvegarde des conversations
     * Utile pour diagnostiquer les problèmes de persistance
     */
    @PostMapping("/test/save")
    public Mono<ResponseEntity<ChatConversation>> testSaveConversation() {
        log.info("Endpoint de test appelé: tentative de sauvegarde d'une conversation de test");
        return chatRagService.testSaveConversation()
                .map(saved -> {
                    log.info("Conversation de test sauvegardée avec succès via endpoint");
                    return ResponseEntity.ok(saved);
                })
                .onErrorResume(e -> {
                    log.error("Erreur lors de la sauvegarde via endpoint de test", e);
                    return Mono.just(ResponseEntity.internalServerError().build());
                });
    }

    /**
     * Endpoint pour vérifier la connectivité de la base de données
     */
    @GetMapping("/test/connection")
    public Mono<ResponseEntity<String>> testDatabaseConnection() {
        log.info("Test de connectivité de la base de données");
        return chatConversationRepository.count()
                .map(count -> ResponseEntity.ok("Base de données accessible. Nombre de conversations: " + count))
                .onErrorResume(e -> {
                    log.error("Erreur de connectivité de la base de données", e);
                    return Mono.just(ResponseEntity.internalServerError().body("Erreur de connexion à la base de données: " + e.getMessage()));
                });
    }
}
