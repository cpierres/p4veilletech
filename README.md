# P4veilletech - Site de Veille Technologique- 16/11/2025

## Description du Projet

Ce projet est un site de **veille technologique**, dédié aux architectures logicielles et à Angular et Spring, développé dans le cadre du **Projet 4** de la <a href="https://openclassrooms.com/fr/paths/533-developpeur-full-stack-java-et-angular" target="_blank">formation certifiante niveau 7 (BAC+5)</a> "Expertise en développement logiciel - avec spécialité Full-Stack Java et Angular" de chez **OpenClassrooms**.

La certification officielle <a href="https://www.francecompetences.fr/recherche/rncp/36912/" target="_blank">RNCP36912 d'expertise en développement logiciel</a> de France Compétences, est attribuée après une évaluation continue sur chaque projet et décision finale d'un jury. 

J'ai profité de ce site de veille, pour exposer l'ensemble de mes projets OpenClassrooms ainsi que mon CV dans le menu **About me**.

Après l'obtention du diplôme, j'ai réalisé les améliorations suivantes :
- gérer une API de chat (chatbot) alimentée par intelligence artificielle (openai)
- stockage de mes documents de référence pour répondre aux questions sur mon expérience (RAG - Retrieval Augmented Generation) dans une base vectorielle pgVector 
  - sources de données : json, markdown, pdf, lecture des README.md des repository github + mise à jour dynamique via Webhook).
- Réponses gérées via des flux (Spring Webflux).
- Interactions vocales (transcription audio vers texte et lecture)

### Contexte et Objectifs

Contrairement à la préconisation d'OpenClassrooms d'utiliser des outils existants (WordPress, blogs), j'ai choisi de créer un site complet avec Angular 19 pour :

- **Maîtriser complètement la présentation** et maintenir une interface sobre et professionnelle
- **Utiliser librement les composants Angular Material** pour une expérience utilisateur optimale
- **Faciliter l'organisation des idées et liens** sans contraintes d'outils tiers
- **Servir d'outil lors d'échanges avec les clients** pour présenter mon expertise technique

### Architecture

Dans la version initiale développée dans le cadre d'OpenClassrooms, ce projet était une **application frontend pure** sans backend, l'objectif étant la rapidité de développement et la flexibilité. 
Les données sont organisées et stockées dans des **structures JSON** intégrées à l'application Angular, permettant une gestion efficace du contenu statique et des informations de veille technologique.

Après l'obtention du diplôme, j'ai réalisé les améliorations suivantes :
- refactoring du projet web qui était dans la racine vers un module frontend dédié
- création d'un module backend pour :
 
#### Structure du dépôt

- frontend/ : Application Angular (déplacée depuis la racine par rapport à la version initiale avec OpenClassrooms)
- backend/ : Backend Spring Boot (Spring AI, pgVector) — chat RAG, TTS/STT, ingestion GitHub (webhook) et déduplication

### Fonctionnalités Principales

- **Site de veille technologique** avec sections dédiées :
  - Frontend (Angular)
  - Backend (Spring)
  - Architecture logicielle
  - Sécurité
  - Tests et bonnes pratiques
  - Informations personnelles et projets

- **Intégration de flux RSS** pour les actualités de sites d'intérêt
- **Interface responsive** adaptée mobile et desktop
- **Navigation intuitive** avec Angular Material
- **Présentation des 13 projets** de la formation certifiante OpenClassrooms

### Nouveautés (après certification openclassrooms)
Les ajouts récents côté backend :

- Webhook GitHub pour synchroniser automatiquement les README.md des dépôts listés: `POST /webhook/github`
- Endpoint d’administration pour lancer une synchro initiale/à la demande: `POST /admin/github/sync-all`
- Déduplication stricte dans la base vectorielle (pgVector) par clé `metadata.source` et cache de hash de contenu → pas de doublons ni de re‑embedding inutile
- Chat de démonstration en SSE: `GET /api/chat?message=...` (flux text/event-stream)
- Transcription audio → texte (OpenAI Whisper API): `POST /api/chat/transcribe` (multipart/form-data)
- Synthèse vocale (TTS) → audio: `GET /api/chat/tts?text=...&format=mp3|wav|ogg`

Voir détails ci‑dessous.

### Technologies Utilisées

- **Angular 19.1.5** avec approche standalone components
- **Angular Material 19.1.2** pour l'interface utilisateur
- **TypeScript 5.7.2** pour la logique métier
- **RxJS 7.8.0** pour la programmation réactive
- **Fast-XML-Parser** pour l'intégration des flux RSS
- **Docker** pour la containerisation
- **Nginx** comme reverse‑proxy (sert la SPA et proxifie les routes backend, y compris le webhook)

### Points Techniques Remarquables

- Premier étudiant à avoir réalisé un site complet pour ce projet selon le mentor OpenClassrooms
- Architecture pensée pour l'évolutivité et la maintenance
- Respect des bonnes pratiques Angular et des standards web
- Site enrichi progressivement lors des projets suivants de la formation

## Déploiement

L'application est  accessible à l'adresse suivante :
**https://veille.cpierres.dscloud.me/**

En production, Nginx sert la SPA et proxifie les endpoints backend, notamment:
- `/api/**` → backend Spring
- `/webhook/github` → backend Spring (réception des push GitHub)
- `/admin/github/sync-all` → backend Spring (admin – à protéger)

## Development server

Le frontend a été déplacé dans le module `frontend/`.
Pour démarrer le serveur de développement local, exécuter depuis le dossier `frontend` :

```bash
cd frontend
ng serve
```

Le backend Spring (module `backend/`) se lance en parallèle (profil/dev selon configuration). Les endpoints exposés sont décrits dans la section suivante.

## Backend (Spring Boot / Spring AI)

Fonctionnalités livrées après la certification OpenClassrooms :

- Chat SSE (démo RAG):
  - `GET /api/chat?message=...&lang=fr|en`
  - Produit `text/event-stream` pour un rendu progressif côté UI.

- Transcription audio → texte (STT):
  - `POST /api/chat/transcribe` (multipart: `file`)
  - Paramètre optionnel `lang` (par défaut `fr`).

- Synthèse vocale (TTS):
  - `GET /api/chat/tts?text=...&voice=alloy&format=mp3|wav|ogg&lang=fr|en`

- Ingestion GitHub des README.md (initiale + mises à jour):
  - Webhook: `POST /webhook/github` (événement GitHub « push »)
  - Admin: `POST /admin/github/sync-all` (lecture du fichier d’évaluations et upsert de tous les README)

### Anti‑doublons et contrôle des coûts

- Chaque document est identifié par `metadata.source` (clé d’unicité). Exemple: `github:{owner}/{repo}/README.md` ou chemin relatif dans `skills-data` pour les fichiers locaux.
- Avant toute ré‑ingestion, les anciens vecteurs du même `source` sont supprimés (delete‑then‑add) dans pgVector.
- Un cache de hash (SHA‑256 du contenu) évite de re‑calculer les embeddings si le fichier n’a pas changé.

Résultat: pas de doublons dans pgVector et aucune consommation de tokens OpenAI inutile.

### Configuration requise

- Variable d’environnement `OPENAI_CHATBOT_KEY` (ou propriété `spring.ai.openai.api-key`) pour les fonctionnalités LLM/TTS/STT.
- Optionnel mais recommandé: `GITHUB_TOKEN` pour augmenter la limite de taux et lire des dépôts privés.
  - Token possible en deux variantes:
    - PAT classic: cochez `public_repo` (dépôts publics) ou `repo` (accès lecture aux privés).
    - PAT fine‑grained: dans « Repository permissions », mettez `Contents: Read‑only` sur les dépôts concernés.

### Configuration Nginx (rappel)

Ajouter blocs de localisation (extraits) dans `nginx.conf`:

```
location ^~ /api/ { proxy_pass http://backend:8080/api/; }
location = /webhook/github { proxy_pass http://backend:8080/webhook/github; }
location = /admin/github/sync-all { proxy_pass http://backend:8080/admin/github/sync-all; }
```

En production, utiliser HTTPS, désactiver buffering pour SSE si nécessaire (`/api/chat`) et protéger l'endpoint `/admin/**` (auth/IP allowlist).

### Webhook GitHub – configuration rapide

- Payload URL en prod: `https://cpierres.dscloud.me/webhook/github` (derrière Nginx qui proxifie vers le backend)
- Content type : `application/json`
- Événements : au minimum `push`
- Secret : recommandé (TODO activer et valider la signature côté backend si configuré)

Tests locaux possibles via tunnel (ngrok/Cloudflared) ou via un reverse‑proxy local. Pour un test direct: 

```
curl -X POST "http://localhost:8080/webhook/github" \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -d '{"ref":"refs/heads/main","repository":{"name":"p4veilletech","owner":{"login":"cpierres"}}}'
```

## Structure Technique de l'application frontale

### Architecture Générale

L'application suit une **architecture Angular modulaire** basée sur les **standalone components** d'Angular 19, avec une séparation claire des responsabilités :

- src/app/ 
  - component/ # Composants réutilisables 
  - core/ # Services et modèles centraux 
  - pages/ # Pages/vues de l'application 
  - directives/ # Directives personnalisées 
  - app.component.* # Composant racine 
  - app.config.ts # Configuration globale 
  - app.routes.ts # Routage de l'application


### Services Principaux

#### **RssService** (`src/app/core/services/rssfeed/`)
- **Responsabilité** : Gestion des flux RSS des sites de veille technologique
- **Technologies** : HttpClient, RxJS, fast-xml-parser
- **Fonctionnalités** :
  - Parsing des flux RSS/XML vers format JSON
  - Cache intelligent avec BehaviorSubject
  - Gestion réactive des données avec observables

#### **LinksInfoService** (`src/app/core/services/links-info/`)
- **Responsabilité** : Gestion centralisée des liens et ressources
- **Fonctionnalités** :
  - Fourniture des liens organisés par catégorie
  - Données statiques structurées (Docker/Kubernetes, architectures, etc.)
  - Interface de données normalisée

### Modèles de Données

#### **RssData** Interface
```typescript
interface RssData {
  title: string;
  link: string;
}
```

#### Interface **LinkInfo**
```typescript
interface LinkInfo {
  name: string;
  link: string;
  title?: string;
  choice?: string; // Système de classement (médailles)
}
```
### Composants Techniques
#### **Composants Réutilisables** (`src/app/component/`)
- **rssfeed** : Affichage et gestion des flux RSS
- **link-info** : Présentation structurée des liens de veille
- **classement** : Système de notation et classement des ressources

#### **Pages Principales** (`src/app/pages/`)
- **home** : Page d'accueil avec présentation générale
- **front** : Veille technologique Frontend/Angular
- **back** : Veille technologique Backend/Spring
- **architecture** : Architectures logicielles et patterns
- **about** : Présentation personnelle et projets OpenClassrooms
- **test-overview** : Bonnes pratiques de tests

### Patterns Architecturaux Utilisés
- **Dependency Injection** : Services injectés via Angular DI
- **Observer Pattern** : Gestion réactive avec RxJS
- **Singleton Pattern** : Services providedIn 'root'
- **Separation of Concerns** : Séparation modèles/services/composants
- **Facade Pattern** : Services exposant une interface simplifiée

### Gestion des États
- **BehaviorSubject** : Cache des données RSS avec état persistant
- **Observables** : Flux de données réactifs
- **Services singletons** : État partagé entre composants

### Technologies d'Infrastructure
- **Angular Router** : Navigation SPA
- **Angular Material** : Composants UI cohérents
- **TypeScript** : Typage statique et sécurité
- **RxJS** : Programmation réactive
- **Fast-XML-Parser** : Parsing optimisé des flux RSS

Cette architecture privilégie la **maintenabilité**, la **réutilisabilité** et les **performances** tout en respectant les bonnes pratiques Angular modernes.


## Extraction JSON des Projets OpenClassrooms

Afin de préparer l'ingestion dans une base vectorielle, les informations texte des projets présents dans `frontend/src/app/pages/about/projets-ocr/projets-ocr.component.html` ainsi que les évaluations détaillées dans `frontend/src/assets/docs/projets-openclassrooms-evaluations.md` ont été rationalisées en un fichier JSON unique.

- Script de génération: `frontend/scripts/generate-ocr-json.js`
- Commande (à exécuter depuis `frontend/`): `npm run gen:ocr-json`
- Sortie: `frontend/src/assets/data/projets-ocr.json`

Ce JSON contient, pour chaque projet, les champs suivants:
- `id`: numéro du projet (déduit du titre)
- `title`: titre du panneau de projet
- `description`: sous-titre du panneau
- `headings`: liste des sous-sections détectées (h3–h5)
- `links`: liste des liens (texte + href)
- `textContent`: contenu texte complet nettoyé du HTML
- `externalId`: identifiant OpenClassrooms (ex: OC-P6) si applicable
- `evaluation`: s'il existe dans le markdown, bloc structuré (évaluateur, date, github, titre, lien OCR, compétences, points forts, axes d'amélioration, remarques, soutenance)

Remarques:
- Le mappage vers `externalId` suit la convention: `Projet N` → `OC-PN` pour N ≥ 2. Les éventuels panneaux hors scope OCR n'ont pas d'`externalId`.
- Le parser est volontairement simple et sans dépendances externes; il repose sur des heuristiques adaptées au HTML actuel. Si la structure du HTML change fortement, mettre à jour `frontend/scripts/generate-ocr-json.js` en conséquence.

---

### Nouveautés (après openclassrooms)

- Ajout d’un contrôleur de webhook GitHub (`GithubSyncController`) avec deux endpoints:
  - `POST /webhook/github` pour réagir aux `push` et upserter le README du dépôt concerné
  - `POST /admin/github/sync-all` pour une synchro initiale/à la demande
- Implémentation de la déduplication dans pgVector via `VectorStoreMaintenance.deleteBySource(source)` et d’un cache de hash de contenu
- Intégration d’endpoints de démonstration côté chat/IA: SSE `/api/chat`, STT `/api/chat/transcribe`, TTS `/api/chat/tts`
- Documentation Nginx mise à jour pour exposer proprement `/webhook/github` et `/admin/github/sync-all`

Ces évolutions rendent l'ingestion GitHub dynamique, suppriment les doublons dans la base vectorielle et réduisent les coûts d’embedding.
