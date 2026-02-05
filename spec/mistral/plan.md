# P4veilletech - Mistral AI Integration Plan

## 1. Project Overview

### 1.1 System Architecture
- **Monolithic Spring Boot backend** with Angular frontend
- **Multi-provider AI architecture** supporting OpenAI, Mistral Cloud, and local Mistral models
- **Reactive programming** with Spring WebFlux and Project Reactor
- **RAG (Retrieval-Augmented Generation)** with pgVector for document storage

### 1.2 Key Components
- **Backend**: Spring Boot 3.5.8, Spring AI 1.1.2, PostgreSQL with pgVector
- **Frontend**: Angular 19.1.5, Angular Material 19.1.2, TypeScript 5.7.2
- **AI Providers**: OpenAI (default), Mistral Cloud, Mistral Local (LM Studio)

## 2. Current Implementation Status

### 2.1 Backend Implementation
- ✅ Multi-provider AI configuration (`MultiProviderAiConfig.java`)
- ✅ Mistral local configuration (`LmStudioMistralConfig.java`)
- ✅ Chat service with RAG capabilities (`ChatRagService.java`)
- ✅ GitHub README synchronization (`GitHubReadmeUpsertService.java`)
- ✅ SSE streaming for chat responses
- ✅ Audio transcription and TTS support
- ✅ Comprehensive error handling and observability

### 2.2 Frontend Implementation
- ✅ Real-time chat interface with streaming responses
- ✅ Audio recording and transcription
- ✅ Text-to-speech playback
- ✅ Markdown rendering for formatted content
- ✅ RSS feed integration
- ✅ Responsive navigation with collapsible sidebar

### 2.3 Deployment Infrastructure
- ✅ Dockerized deployment with Docker Compose
- ✅ Nginx reverse proxy with SSE support
- ✅ PostgreSQL with pgVector extension
- ✅ Environment variable configuration

## 3. Mistral AI Integration Details

### 3.1 Provider Configuration
- **Mistral Cloud**: Configured in `MultiProviderAiConfig.java`
- **Mistral Local**: Configured in `LmStudioMistralConfig.java`
- **Provider Selection**: Environment variable `AI_PROVIDER` (openai, mistral, mistral-local)

### 3.2 Model Configuration
- **Default Model**: `mistral-large-latest` for Mistral Cloud
- **Local Model**: `mistral-tiny` for LM Studio
- **Configuration Parameters**:
  - Temperature: 0.7 (default)
  - Max tokens: 4096
  - Top P: 0.9
  - Frequency penalty: 0.0
  - Presence penalty: 0.0

### 3.3 RAG Implementation
- **Vector Store**: pgVector with PostgreSQL
- **Document Processing**: GitHub READMEs synchronized via webhook
- **Content Deduplication**: SHA-256 hashing to prevent duplicates

## 4. Observability and Monitoring

### 4.1 Current Implementation
- ✅ Micrometer metrics integration
- ✅ Prometheus endpoint (`/actuator/prometheus`)
- ✅ Token usage tracking
- ✅ Request/response logging
- ✅ Error rate monitoring

### 4.2 Planned Enhancements
- [ ] Enhanced Mistral-specific metrics
- [ ] Model performance tracking
- [ ] Provider comparison dashboards
- [ ] Cost analysis and optimization

## 5. Error Handling and Resilience

### 5.1 Current Implementation
- ✅ `AiProviderException` for AI-specific errors
- ✅ `GlobalExceptionHandler` for REST API error responses
- ✅ Rate limit detection (429 errors)
- ✅ Connection timeout handling
- ✅ Wrapped exception detection

### 5.2 Mistral-Specific Considerations
- [ ] Mistral Cloud rate limit handling
- [ ] Local model fallback strategy
- [ ] Provider switching on failure
- [ ] Enhanced error messages for Mistral models

## 6. Testing Strategy

### 6.1 Current Test Coverage
- ✅ Unit tests for exception handling
- ✅ Spring Boot context tests
- ✅ Error scenario validation
- ✅ Cause chain testing for wrapped exceptions

### 6.2 Planned Test Enhancements
- [ ] Mistral Cloud API integration tests
- [ ] Local model performance tests
- [ ] Provider switching tests
- [ ] RAG accuracy validation

## 7. Deployment and Operations

### 7.1 Current Deployment
- ✅ Docker Compose orchestration
- ✅ Nginx reverse proxy configuration
- ✅ Environment variable management
- ✅ Health checks and readiness probes

### 7.2 Mistral-Specific Deployment
- [ ] Mistral Cloud API key management
- [ ] Local model deployment scripts
- [ ] Provider health monitoring
- [ ] Automatic failover configuration

## 8. Future Roadmap

### 8.1 Short-term (1-3 months)
- [ ] Complete Mistral Cloud integration testing
- [ ] Optimize local model performance
- [ ] Enhance observability for Mistral providers
- [ ] Implement provider switching logic

### 8.2 Medium-term (3-6 months)
- [ ] Add support for additional Mistral models
- [ ] Implement model performance comparison
- [ ] Enhance RAG capabilities with Mistral-specific optimizations
- [ ] Develop cost optimization strategies

### 8.3 Long-term (6-12 months)
- [ ] Explore Mistral fine-tuning capabilities
- [ ] Implement multi-model ensemble approaches
- [ ] Develop Mistral-specific prompt engineering
- [ ] Create comprehensive documentation and tutorials

## 9. Technical Documentation

### 9.1 Architecture Diagrams
Ces diagrammes représentent les architectures principales pour la veille technologique, chacun avec sa propre approche et ses avantages.

- Event-driven architecture (`archi-event-driven.puml`)
- Hexagonal architecture (`archi-hexagonale.puml`)
- Microservices architecture (`archi-microservices.puml`)
- Security architecture (`archi-secu-*.puml`)

### 9.2 API Documentation
- REST API endpoints (`ChatController.java`, `GithubSyncController.java`)
- SSE streaming implementation
- Error response formats

### 9.3 Configuration Guide
- Environment variables
- Provider configuration
- Model parameters
- Deployment options

## 10. Getting Started Guide

### 10.1 Prerequisites
- Java 17+
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL with pgVector extension
- Mistral Cloud API key (for cloud provider)

### 10.2 Setup Instructions
1. Clone repository
2. Configure environment variables
3. Build backend (`./mvnw clean package`)
4. Build frontend (`npm run build`)
5. Start services (`docker-compose up`)

### 10.3 Usage Examples
- Basic chat interaction
- Audio transcription
- GitHub README synchronization
- Provider switching

## 11. Troubleshooting Guide

### 11.1 Common Issues
- Connection timeouts
- Rate limit errors
- Model loading failures
- Vector store connectivity

### 11.2 Debugging Techniques
- Enable debug logging
- Check Actuator endpoints
- Review Prometheus metrics
- Test individual providers

## 12. Contribution Guidelines

### 12.1 Development Workflow
- Feature branches
- Pull request process
- Code review requirements
- Testing expectations

### 12.2 Coding Standards
- Java and TypeScript conventions
- Documentation requirements
- Commit message format
- Branch naming conventions

## 13. Appendix

### 13.1 Glossary
- RAG: Retrieval-Augmented Generation
- SSE: Server-Sent Events
- TTS: Text-to-Speech
- STT: Speech-to-Text

### 13.2 References
- Spring AI documentation
- Mistral AI API documentation
- Angular documentation
- PostgreSQL pgVector extension

### 13.3 Version History
- Current version: 1.0 (Mistral AI integration)
- Previous versions and changelog
