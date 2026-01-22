-- Flyway migration V2: audit table for AI chat interactions

CREATE TABLE IF NOT EXISTS ai_chat_audit (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  response text,
  model text,
  temperature double precision,
  top_k integer,
  similarity_threshold double precision,
  lang varchar(8),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ai_chat_audit_created_at_idx ON ai_chat_audit(created_at);
