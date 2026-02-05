# Gestion des erreurs - Étapes d'implémentation

## Contexte
Améliorer la gestion des erreurs pour deux cas spécifiques :
1. **429 Too Many Requests** : Crédit API épuisé (ex: Mistral AI cloud)
2. **Connection timed out** : Serveur de modèles locaux non disponible

## Problème identifié (2026-02-05)
L'erreur `WebClientRequestException` (timeout) est parfois enveloppée dans une `IllegalStateException: Stream processing failed` par Spring AI.
Solution : ajouter un handler `.onErrorMap(IllegalStateException.class, ...)` qui parcourt la chaîne des causes pour détecter `WebClientRequestException`.

## Liste des tâches

### 1. Créer une classe d'exception personnalisée
- [x] Créer `AiProviderException` dans le package `exception`
- [x] Inclure des champs pour : type d'erreur, provider, message utilisateur

### 2. Créer un GlobalExceptionHandler
- [x] Ajouter un `@ControllerAdvice` pour intercepter les exceptions
- [x] Gérer `WebClientResponseException$TooManyRequests` (429)
- [x] Gérer `WebClientRequestException` (timeout/connexion)
- [x] Retourner des réponses HTTP appropriées avec messages clairs

### 3. Modifier ChatRagService
- [x] Encapsuler les appels au ChatModel dans un try-catch réactif (`.onErrorResume()` ou `.onErrorMap()`)
- [x] Transformer les exceptions techniques en `AiProviderException` avec messages explicites :
  - 429 → "Crédit API épuisé. Veuillez recharger votre compte chez le fournisseur."
  - Timeout → "Le serveur de modèles locaux n'est pas disponible. Vérifiez qu'il est démarré."

### 4. Adapter le ChatController
- [x] S'assurer que les erreurs sont propagées correctement au frontend
- [x] Retourner un flux d'erreur SSE lisible par le client

### 5. Adapter le frontend (chat.component.ts)
- [x] Gérer les erreurs SSE côté Angular
- [x] Afficher un message d'erreur explicite à l'utilisateur dans l'interface

### 6. Tests
- [ ] Ajouter des tests unitaires pour les nouveaux cas d'erreur
- [ ] Tester le comportement avec mock des exceptions

## Fichiers concernés
- `backend/src/main/java/com/cpierres/p4veilletech/backend/service/ChatRagService.java`
- `backend/src/main/java/com/cpierres/p4veilletech/backend/controller/ChatController.java`
- `backend/src/main/java/com/cpierres/p4veilletech/backend/exception/` (nouveau package)
- `frontend/src/app/pages/chat/chat.component.ts`
- `frontend/src/app/pages/chat/chat.component.html`
