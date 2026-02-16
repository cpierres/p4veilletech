-- Migration pour créer la table de conversations du chatbot

CREATE TABLE chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255),
    session_id VARCHAR(255),
    user_message TEXT NOT NULL,
    assistant_response TEXT NOT NULL,
    provider VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    temperature NUMERIC(3,2),
    top_p NUMERIC(3,2),
    max_tokens INTEGER,
    rag_top_k INTEGER,
    rag_similarity_threshold NUMERIC(5,4),
    tokens_used INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT
);

-- Index pour optimiser les requêtes courantes
CREATE INDEX idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX idx_chat_conversations_created_at ON chat_conversations(created_at);
CREATE INDEX idx_chat_conversations_provider ON chat_conversations(provider);

-- Trigger pour mettre à jour le timestamp de mise à jour
CREATE OR REPLACE FUNCTION update_chat_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_chat_conversation_timestamp
BEFORE UPDATE ON chat_conversations
FOR EACH ROW
EXECUTE FUNCTION update_chat_conversation_timestamp();

-- Commentaire sur la table
COMMENT ON TABLE chat_conversations IS 'Stocke l''historique des conversations du chatbot avec les paramètres utilisés';
