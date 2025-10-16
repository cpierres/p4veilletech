-- Enable pgvector extension on the default database
CREATE EXTENSION IF NOT EXISTS vector;
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Optional: Verify the extension is loaded
SELECT * FROM pg_extension WHERE extname = 'vector';
