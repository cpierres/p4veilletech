package com.cpierres.p4veilletech.backend.exception;

import lombok.Getter;

/**
 * Exception personnalisée pour les erreurs liées aux fournisseurs d'IA.
 */
@Getter
public class AiProviderException extends RuntimeException {

    public enum ErrorType {
        RATE_LIMIT_EXCEEDED,    // 429 Too Many Requests
        CONNECTION_TIMEOUT,      // Serveur non disponible
        PROVIDER_UNAVAILABLE,    // Autre erreur de connexion
        UNKNOWN                  // Erreur inconnue
    }

    private final ErrorType errorType;
    private final String provider;
    private final String userMessage;

    public AiProviderException(ErrorType errorType, String provider, String userMessage, Throwable cause) {
        super(userMessage, cause);
        this.errorType = errorType;
        this.provider = provider;
        this.userMessage = userMessage;
    }

    public AiProviderException(ErrorType errorType, String provider, String userMessage) {
        super(userMessage);
        this.errorType = errorType;
        this.provider = provider;
        this.userMessage = userMessage;
    }
}
