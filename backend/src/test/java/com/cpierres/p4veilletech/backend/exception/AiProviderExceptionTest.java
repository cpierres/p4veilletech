package com.cpierres.p4veilletech.backend.exception;

import org.junit.jupiter.api.Test;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.net.URI;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests unitaires pour AiProviderException et la gestion des erreurs AI.
 */
class AiProviderExceptionTest {

    @Test
    void shouldCreateExceptionWithAllFields() {
        // Given
        AiProviderException.ErrorType errorType = AiProviderException.ErrorType.RATE_LIMIT_EXCEEDED;
        String provider = "mistral-cloud";
        String userMessage = "Crédit API épuisé.";

        // When
        AiProviderException exception = new AiProviderException(errorType, provider, userMessage);

        // Then
        assertThat(exception.getErrorType()).isEqualTo(errorType);
        assertThat(exception.getProvider()).isEqualTo(provider);
        assertThat(exception.getUserMessage()).isEqualTo(userMessage);
        assertThat(exception.getMessage()).isEqualTo(userMessage);
    }

    @Test
    void shouldCreateExceptionWithCause() {
        // Given
        AiProviderException.ErrorType errorType = AiProviderException.ErrorType.CONNECTION_TIMEOUT;
        String provider = "mistral";
        String userMessage = "Le serveur de modèles locaux n'est pas disponible.";
        RuntimeException cause = new RuntimeException("Connection timed out");

        // When
        AiProviderException exception = new AiProviderException(errorType, provider, userMessage, cause);

        // Then
        assertThat(exception.getErrorType()).isEqualTo(errorType);
        assertThat(exception.getProvider()).isEqualTo(provider);
        assertThat(exception.getUserMessage()).isEqualTo(userMessage);
        assertThat(exception.getCause()).isEqualTo(cause);
    }

    @Test
    void shouldHaveCorrectErrorTypes() {
        // Verify all error types exist
        assertThat(AiProviderException.ErrorType.RATE_LIMIT_EXCEEDED).isNotNull();
        assertThat(AiProviderException.ErrorType.CONNECTION_TIMEOUT).isNotNull();
        assertThat(AiProviderException.ErrorType.PROVIDER_UNAVAILABLE).isNotNull();
        assertThat(AiProviderException.ErrorType.UNKNOWN).isNotNull();
    }

    @Test
    void shouldMapTooManyRequestsToRateLimitExceeded() {
        // Given - simulating 429 error handling logic
        String provider = "mistral-cloud";

        // When
        AiProviderException exception = new AiProviderException(
                AiProviderException.ErrorType.RATE_LIMIT_EXCEEDED,
                provider,
                "Crédit API épuisé. Veuillez recharger votre compte chez le fournisseur."
        );

        // Then
        assertThat(exception.getErrorType()).isEqualTo(AiProviderException.ErrorType.RATE_LIMIT_EXCEEDED);
        assertThat(exception.getUserMessage()).contains("Crédit API épuisé");
    }

    @Test
    void shouldMapConnectionTimeoutToConnectionTimeout() {
        // Given - simulating timeout error handling logic
        String provider = "mistral";
        String timeoutMessage = "Connection timed out: getsockopt: /192.168.10.1:1234";

        // When - determine message based on timeout detection
        String userMessage = timeoutMessage.contains("timed out")
                ? "Le serveur de modèles locaux n'est pas disponible. Vérifiez qu'il est démarré."
                : "Impossible de se connecter au fournisseur d'IA. Vérifiez votre connexion.";

        AiProviderException exception = new AiProviderException(
                AiProviderException.ErrorType.CONNECTION_TIMEOUT,
                provider,
                userMessage
        );

        // Then
        assertThat(exception.getErrorType()).isEqualTo(AiProviderException.ErrorType.CONNECTION_TIMEOUT);
        assertThat(exception.getUserMessage()).contains("serveur de modèles locaux");
    }

    @Test
    void shouldDetectWrappedWebClientRequestException() {
        // Given - simulating IllegalStateException wrapping WebClientRequestException
        WebClientRequestException webClientEx = new WebClientRequestException(
                new RuntimeException("Connection timed out"),
                org.springframework.http.HttpMethod.POST,
                URI.create("http://192.168.10.1:1234/v1/chat/completions"),
                org.springframework.http.HttpHeaders.EMPTY
        );
        IllegalStateException wrappedException = new IllegalStateException("Stream processing failed", webClientEx);

        // When - traverse cause chain (simulating ChatRagService logic)
        Throwable cause = wrappedException.getCause();
        boolean foundWebClientRequestException = false;
        while (cause != null) {
            if (cause instanceof WebClientRequestException) {
                foundWebClientRequestException = true;
                break;
            }
            cause = cause.getCause();
        }

        // Then
        assertThat(foundWebClientRequestException).isTrue();
    }
}
