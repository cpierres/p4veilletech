package com.cpierres.p4veilletech.backend.config;

import com.cpierres.p4veilletech.backend.dto.AiProvider;
import com.cpierres.p4veilletech.backend.service.VectorStoreMaintenance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.embedding.BatchingStrategy;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.mistralai.MistralAiEmbeddingModel;
import org.springframework.ai.openai.OpenAiEmbeddingModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.observation.VectorStoreObservationConvention;
import org.springframework.ai.vectorstore.pgvector.PgVectorStore;
import org.springframework.ai.vectorstore.pgvector.autoconfigure.PgVectorStoreProperties;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import io.micrometer.observation.ObservationRegistry;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class VectorStoreConfig {

    private static final Logger log = LoggerFactory.getLogger(VectorStoreConfig.class);

    @Bean
    @Qualifier("openAiVectorStore")
    @ConditionalOnProperty(prefix = "spring.ai.openai", name = "api-key")
    public PgVectorStore openAiVectorStore(
            JdbcTemplate jdbcTemplate,
            OpenAiEmbeddingModel embeddingModel,
            PgVectorStoreProperties properties,
            ObjectProvider<ObservationRegistry> observationRegistry,
            ObjectProvider<VectorStoreObservationConvention> customObservationConvention,
            BatchingStrategy batchingStrategy) {
        return buildVectorStore(
                jdbcTemplate,
                embeddingModel,
                properties,
                properties.getTableName(),
                properties.getDimensions(),
                observationRegistry,
                customObservationConvention,
                batchingStrategy);
    }

    @Bean
    @Qualifier("mistralVectorStore")
    @ConditionalOnProperty(prefix = "spring.ai.mistralai", name = "api-key")
    public PgVectorStore mistralVectorStore(
            JdbcTemplate jdbcTemplate,
            MistralAiEmbeddingModel embeddingModel,
            PgVectorStoreProperties properties,
            @Value("${app.vectorstore.mistral.table-name:vector_store_mistral}") String tableName,
            @Value("${app.vectorstore.mistral.dimensions:1024}") int dimensions,
            ObjectProvider<ObservationRegistry> observationRegistry,
            ObjectProvider<VectorStoreObservationConvention> customObservationConvention,
            BatchingStrategy batchingStrategy) {
        return buildVectorStore(
                jdbcTemplate,
                embeddingModel,
                properties,
                tableName,
                dimensions,
                observationRegistry,
                customObservationConvention,
                batchingStrategy);
    }

    @Bean
    @Qualifier("vectorStoreMap")
    public Map<AiProvider, VectorStore> vectorStoreMap(
            @Qualifier("openAiVectorStore") ObjectProvider<VectorStore> openAiVectorStoreProvider,
            @Qualifier("mistralVectorStore") ObjectProvider<VectorStore> mistralVectorStoreProvider) {
        var builder = new HashMap<AiProvider, VectorStore>();
        VectorStore openAi = openAiVectorStoreProvider.getIfAvailable();
        if (openAi != null) {
            builder.put(AiProvider.OPENAI, openAi);
            log.info("OpenAI VectorStore registered");
        }
        VectorStore mistral = mistralVectorStoreProvider.getIfAvailable();
        if (mistral != null) {
            builder.put(AiProvider.MISTRAL, mistral);
            builder.put(AiProvider.MISTRAL_CLOUD, mistral);
            log.info("Mistral VectorStore registered (MISTRAL and MISTRAL_CLOUD)");
        }
        if (builder.isEmpty()) {
            log.warn("No VectorStore available! Please configure at least one AI provider.");
        }
        return Map.copyOf(builder);
    }

    @Bean
    @Qualifier("openAiVectorStoreMaintenance")
    @ConditionalOnBean(name = "openAiVectorStore")
    public VectorStoreMaintenance openAiVectorStoreMaintenance(JdbcTemplate jdbcTemplate,
            PgVectorStoreProperties properties) {
        return new VectorStoreMaintenance(jdbcTemplate, properties.getTableName());
    }

    @Bean
    @Qualifier("mistralVectorStoreMaintenance")
    @ConditionalOnBean(name = "mistralVectorStore")
    public VectorStoreMaintenance mistralVectorStoreMaintenance(JdbcTemplate jdbcTemplate,
            @Value("${app.vectorstore.mistral.table-name:vector_store_mistral}") String tableName) {
        return new VectorStoreMaintenance(jdbcTemplate, tableName);
    }

    @Bean
    @Qualifier("vectorStoreMaintenanceMap")
    public Map<AiProvider, VectorStoreMaintenance> vectorStoreMaintenanceMap(
            @Qualifier("openAiVectorStoreMaintenance") ObjectProvider<VectorStoreMaintenance> openAiMaintenanceProvider,
            @Qualifier("mistralVectorStoreMaintenance") ObjectProvider<VectorStoreMaintenance> mistralMaintenanceProvider) {
        var builder = new HashMap<AiProvider, VectorStoreMaintenance>();
        VectorStoreMaintenance openAi = openAiMaintenanceProvider.getIfAvailable();
        if (openAi != null) {
            builder.put(AiProvider.OPENAI, openAi);
        }
        VectorStoreMaintenance mistral = mistralMaintenanceProvider.getIfAvailable();
        if (mistral != null) {
            builder.put(AiProvider.MISTRAL, mistral);
        }
        return Map.copyOf(builder);
    }

    private PgVectorStore buildVectorStore(
            JdbcTemplate jdbcTemplate,
            EmbeddingModel embeddingModel,
            PgVectorStoreProperties properties,
            String tableName,
            int dimensions,
            ObjectProvider<ObservationRegistry> observationRegistry,
            ObjectProvider<VectorStoreObservationConvention> customObservationConvention,
            BatchingStrategy batchingStrategy) {
        return PgVectorStore.builder(jdbcTemplate, embeddingModel)
                .schemaName(properties.getSchemaName())
                .idType(properties.getIdType())
                .vectorTableName(tableName)
                .vectorTableValidationsEnabled(properties.isSchemaValidation())
                .dimensions(dimensions)
                .distanceType(properties.getDistanceType())
                .removeExistingVectorStoreTable(properties.isRemoveExistingVectorStoreTable())
                .indexType(properties.getIndexType())
                .initializeSchema(properties.isInitializeSchema())
                .observationRegistry(observationRegistry.getIfUnique(() -> ObservationRegistry.NOOP))
                .customObservationConvention(customObservationConvention.getIfAvailable(() -> null))
                .batchingStrategy(batchingStrategy)
                .maxDocumentBatchSize(properties.getMaxDocumentBatchSize())
                .build();
    }
}
