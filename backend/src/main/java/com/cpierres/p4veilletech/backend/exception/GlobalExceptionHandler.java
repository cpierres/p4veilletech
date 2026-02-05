package com.cpierres.p4veilletech.backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Map;

/**
 * Gestionnaire global des exceptions pour l'API.
 */
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WebClientResponseException.TooManyRequests.class)
    public ResponseEntity<Map<String, Object>> handleTooManyRequests(WebClientResponseException.TooManyRequests ex) {
        log.error("Erreur 429 Too Many Requests: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body(Map.of(
                        "error", "RATE_LIMIT_EXCEEDED",
                        "message", "Crédit API épuisé. Veuillez recharger votre compte chez le fournisseur.",
                        "details", ex.getMessage()
                ));
    }

    @ExceptionHandler(WebClientRequestException.class)
    public ResponseEntity<Map<String, Object>> handleWebClientRequestException(WebClientRequestException ex) {
        log.error("Erreur de connexion au serveur: {}", ex.getMessage());
        String message = ex.getMessage() != null && ex.getMessage().contains("timed out")
                ? "Le serveur de modèles locaux n'est pas disponible. Vérifiez qu'il est démarré."
                : "Impossible de se connecter au fournisseur d'IA. Vérifiez votre connexion.";

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of(
                        "error", "CONNECTION_TIMEOUT",
                        "message", message,
                        "details", ex.getMessage() != null ? ex.getMessage() : "Unknown error"
                ));
    }

    @ExceptionHandler(AiProviderException.class)
    public ResponseEntity<Map<String, Object>> handleAiProviderException(AiProviderException ex) {
        log.error("Erreur fournisseur IA [{}]: {}", ex.getProvider(), ex.getUserMessage());
        HttpStatus status = switch (ex.getErrorType()) {
            case RATE_LIMIT_EXCEEDED -> HttpStatus.TOO_MANY_REQUESTS;
            case CONNECTION_TIMEOUT, PROVIDER_UNAVAILABLE -> HttpStatus.SERVICE_UNAVAILABLE;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };

        return ResponseEntity.status(status)
                .body(Map.of(
                        "error", ex.getErrorType().name(),
                        "provider", ex.getProvider() != null ? ex.getProvider() : "unknown",
                        "message", ex.getUserMessage()
                ));
    }
}
