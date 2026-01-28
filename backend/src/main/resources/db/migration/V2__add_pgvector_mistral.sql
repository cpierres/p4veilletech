-- Flyway migration V2: add pgvector table for Mistral embeddings (1024 dims)

CREATE TABLE IF NOT EXISTS vector_store_mistral (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content text,
  metadata json,
  embedding vector(1024)
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'vector_store_mistral_embedding_hnsw_idx'
  ) THEN
    EXECUTE 'CREATE INDEX vector_store_mistral_embedding_hnsw_idx ON vector_store_mistral USING HNSW (embedding vector_cosine_ops)';
  END IF;
END$$;
