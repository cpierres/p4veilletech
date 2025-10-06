# P4veilletech - Site de Veille Technologique

## Structure du dépôt

- frontend/ : Application Angular (déplacée depuis la racine)
- backend/ : à venir (Spring Boot, Spring AI, base vectorielle)

## Description du Projet

Ce projet est un site de **veille technologique**, dédié aux architectures logicielles et à Angular et Spring, développé dans le cadre du **Projet 4** de la <a href="https://openclassrooms.com/fr/paths/533-developpeur-full-stack-java-et-angular" target="_blank">formation certifiante niveau 7 (BAC+5)</a> "Expertise en développement logiciel - avec spécialité Full-Stack Java et Angular" de chez **OpenClassrooms**.

La certification officielle <a href="https://www.francecompetences.fr/recherche/rncp/36912/" target="_blank">RNCP36912 d'expertise en développement logiciel</a> de France Compétences, est attribuée après une évaluation continue sur chaque projet et décision finale d'un jury. 

J'ai profité de ce site de veille, pour exposer l'ensemble de mes projets OpenClassrooms dans le menu **About me**. 

### Contexte et Objectifs

Contrairement à la préconisation d'OpenClassrooms d'utiliser des outils existants (WordPress, blogs), j'ai choisi de créer un site complet avec Angular 19 pour :

- **Maîtriser complètement la présentation** et maintenir une interface sobre et professionnelle
- **Utiliser librement les composants Angular Material** pour une expérience utilisateur optimale
- **Faciliter l'organisation des idées et liens** sans contraintes d'outils tiers
- **Servir d'outil lors d'échanges avec les clients** pour présenter mon expertise technique

### Architecture

Ce projet est une **application frontend pure** sans backend dédié, l'objectif étant la rapidité de développement et la flexibilité. 
Les données sont organisées et stockées dans des **structures JSON** intégrées à l'application Angular, permettant une gestion efficace du contenu statique et des informations de veille technologique.

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

### Technologies Utilisées

- **Angular 19.1.5** avec approche standalone components
- **Angular Material 19.1.2** pour l'interface utilisateur
- **TypeScript 5.7.2** pour la logique métier
- **RxJS 7.8.0** pour la programmation réactive
- **Fast-XML-Parser** pour l'intégration des flux RSS
- **Docker** pour la containerisation
- **Nginx** comme serveur web

### Points Techniques Remarquables

- Premier étudiant à avoir réalisé un site complet pour ce projet selon le mentor OpenClassrooms
- Architecture pensée pour l'évolutivité et la maintenance
- Respect des bonnes pratiques Angular et des standards web
- Site enrichi progressivement lors des projets suivants de la formation

## Déploiement

L'application est  accessible à l'adresse suivante :
**https://veille.cpierres.dscloud.me/**

## Development server

Le frontend a été déplacé dans le module `frontend/`.
Pour démarrer le serveur de développement local, exécuter depuis le dossier `frontend` :

```bash
cd frontend
ng serve
```

## Structure Technique

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

Afin de préparer une future ingestion dans une base vectorielle, les informations texte des projets présents dans `frontend/src/app/pages/about/projets-ocr/projets-ocr.component.html` ainsi que les évaluations détaillées dans `frontend/src/assets/docs/projets-openclassrooms-evaluations.md` peuvent être rationalisées en un fichier JSON unique.

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
- Le parser est volontairement simple et sans dépendances externes; il repose sur des heuristiques adaptées au HTML actuel. Si la structure du HTML change fortement, mettez à jour `frontend/scripts/generate-ocr-json.js` en conséquence.
