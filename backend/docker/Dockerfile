# Postgres with pgvector extension
FROM pgvector/pgvector:pg16

# Initialize database with extensions and optional setup
COPY ./init/*.sql /docker-entrypoint-initdb.d/
