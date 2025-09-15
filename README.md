# P4veilletech - Site de Veille Technologique

## Description du Projet

Ce projet est un site de **veille technologique** dédié aux architectures logicielles, Angular et Spring, développé dans le cadre du **Projet 4** de la <a href="https://openclassrooms.com/fr/paths/533-developpeur-full-stack-java-et-angular" target="_blank">formation certifiante niveau 7 (BAC+5)</a> "Expertise en développement logiciel - avec spécialité Full-Stack Java et Angular" de chez **OpenClassrooms**.

La certification officielle <a href="https://www.francecompetences.fr/recherche/rncp/36912/" target="_blank">RNCP36912 d'expertise en développement logiciel</a> de France Compétences, est attribuée après une évaluation continue sur chaque projet et l'évaluation finale d'un jury. 

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

Pour démarrer le serveur de développement local, exécuter :

```bash
ng serve
```
