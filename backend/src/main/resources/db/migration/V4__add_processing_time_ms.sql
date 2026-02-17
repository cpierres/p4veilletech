-- Migration pour ajouter la colonne processing_time_ms à la table chat_conversations

ALTER TABLE chat_conversations ADD COLUMN processing_time_ms INTEGER;

COMMENT ON COLUMN chat_conversations.processing_time_ms IS 'Temps de traitement de la requête en millisecondes';
