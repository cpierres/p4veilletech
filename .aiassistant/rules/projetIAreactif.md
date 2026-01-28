---
apply: manually
---

# Règles pour le projet Spring Boot Réactif
## Contexte
- Backend : Spring Boot 3.5.8 + Spring WebFlux
- Base de données : PostgreSQL 18 + R2DBC
- IA : Spring AI 1.1.2 + pgVector
- Frontend : Angular 19 + TypeScript
<!--  Tests : JUnit 5 + TestContainers -->

## Consignes générales
- Toujours utiliser `Mono` ou `Flux` pour les endpoints réactifs.
- Éviter les appels bloquants dans les contrôleurs.
- Privilégier `R2DBC` pour les accès base de données.
- Les scripts d'inférence IA doivent être dans `src/main/resources/ai/`.
- Les logs doivent être stockés dans `logs/ai-inference.log`.

## Bonnes pratiques
- Pour les embeddings : utiliser `Spring AI 1.1.2` avec `pgVector`.
<!-- Pour les tests : couverture minimale de 80% avec JUnit 5 et TestContainers. -->
