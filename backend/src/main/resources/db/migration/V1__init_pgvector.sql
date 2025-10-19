-- Flyway migration V1: initialize pgvector extensions and base schema

-- Extensions (idempotent)
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS hstore;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- optional if you prefer uuid_generate_v4()

-- Table for storing embeddings
CREATE TABLE IF NOT EXISTS vector_store (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content text,
  metadata json,
  embedding vector(1536)
);

-- HNSW index for faster similarity search (cosine distance)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'vector_store_embedding_hnsw_idx'
  ) THEN
    EXECUTE 'CREATE INDEX vector_store_embedding_hnsw_idx ON vector_store USING HNSW (embedding vector_cosine_ops)';
  END IF;
END$$;
