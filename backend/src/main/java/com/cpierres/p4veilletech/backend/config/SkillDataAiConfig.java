package com.cpierres.p4veilletech.backend.config;

import org.springframework.ai.document.DocumentTransformer;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.pgvector.PgVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class SkillDataAiConfig {

    @Value("${spring.ai.openai.api-key}")
    private String openAIApiKey;

//    @Bean
//    public EmbeddingModel embeddingModel() {
//        return new OpenAiEmbeddingModel(openAIApiKey);
//    }

//    @Bean
//    public VectorStore vectorStore(EmbeddingModel embeddingModel) {
//        // Utilisation du PgVectorStore Spring AI (les propriétés de connexion PostgreSQL sont standard via spring.datasource.*)
//        return new PgVectorStore(embeddingModel);
//    }
//  @Bean
//  public VectorStore vectorStore(EmbeddingModel embeddingModel, DataSource dataSource) {
//    // Exemple d'utilisation explicite de la DataSource / JdbcTemplate si PgVectorStore le supporte
//    JdbcTemplate jdbc = new JdbcTemplate(dataSource);
//    PgVectorStore store = new PgVectorStore(embeddingModel, jdbc); // ou constructeur/adaptateur approprié
//    // Optional: vérifier la connectivité / existence des tables
//    // validateStore(store);
//    return store;
//  }

  @Bean
  public DocumentTransformer textSplitter() {
    return new TokenTextSplitter(); // Ajustez la taille selon vos besoins
  }
}
