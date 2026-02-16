package com.cpierres.p4veilletech.backend.repository;

import com.cpierres.p4veilletech.backend.model.ChatConversation;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface ChatConversationRepository extends ReactiveCrudRepository<ChatConversation, UUID> {

    // Trouver les conversations par userId
    Flux<ChatConversation> findByUserId(String userId);

    // Trouver les conversations par sessionId
    Flux<ChatConversation> findBySessionId(String sessionId);

    // Trouver les conversations par userId et provider
    Flux<ChatConversation> findByUserIdAndProvider(String userId, String provider);

    // Trouver les conversations par userId avec pagination
    Flux<ChatConversation> findByUserIdOrderByCreatedAtDesc(String userId);

    // Trouver les conversations récentes (limité)
    Flux<ChatConversation> findTop10ByUserIdOrderByCreatedAtDesc(String userId);

    // Compter les conversations par userId
    Mono<Long> countByUserId(String userId);

    // Supprimer les conversations par sessionId
    Mono<Void> deleteBySessionId(String sessionId);

    // Supprimer les conversations par userId
    Mono<Void> deleteByUserId(String userId);
}
