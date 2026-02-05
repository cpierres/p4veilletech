package com.cpierres.p4veilletech.backend.dto;

/**
 * Enumération des fournisseurs d'IA supportés pour le chat et les embeddings.
 */
public enum AiProvider {
    OPENAI("openai", "OpenAI"),
    MISTRAL("mistral", "Mistral Local (LM Studio)"),
    MISTRAL_CLOUD("mistral-cloud", "Mistral AI Cloud");

    private final String code;
    private final String displayName;

    AiProvider(String code, String displayName) {
        this.code = code;
        this.displayName = displayName;
    }

    public String getCode() {
        return code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static AiProvider fromCode(String code) {
        if (code == null || code.isBlank()) {
            return OPENAI; // default
        }
        for (AiProvider provider : values()) {
            if (provider.code.equalsIgnoreCase(code)) {
                return provider;
            }
        }
        return OPENAI; // default fallback
    }
}
