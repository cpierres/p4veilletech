# Postgres with pgvector extension
FROM pgvector/pgvector:pg18

# Initialize database with extensions and optional setup
COPY ./init/*.sql /docker-entrypoint-initdb.d/
