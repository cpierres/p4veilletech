import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatTabsModule
  ],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent {

  personalInfo = {
    name: 'Christophe Pierrès',
    title: 'Développeur Full-Stack Expert • Angular/Spring • Architecte Solutions',
    location: 'Tourcoing (59)',
    phone: '+33 (0) 781 425 406',
    email: 'cpierres@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/christophe-pierres',
    github: 'https://github.com/cpierres',
    website: 'https://veille.cpierres.dscloud.me/',
    status: 'Marié, 2 enfants'
  };

  summary = [
    'Expert en développement full-stack avec 25 ans d\'expérience en architecture JEE',
    'Certification niveau 7 (BAC+5) OpenClassrooms - Expert en Développement Logiciel, spécialités Spring/Angular',
    'Maîtrise de l\'architecture réactive complète (Angular + Spring WebFlux + R2DBC avec PostgreSQL)',
    'Leadership technique : management d\'équipes, formation, méthodologies Agile/SCRUM',
    'Expertise DevOps : CI/CD, Docker, intégration continue, déploiement automatisé'
  ];

  technicalSkills = {
    frontend: ['Angular 14 à 20', 'TypeScript', 'RxJS', 'Angular Material', 'Signals', 'ADF JSF'],
    backend: ['Spring WebFlux', 'Spring Boot 3', 'JPA/Spring Data', 'R2DBC', 'Kafka', 'PostgreSQL','ADF BC'],
    testing: ['JUnit 5', 'Jest', 'Cypress', 'TestBed', 'Mockito', 'TDD/BDD', 'Gherkin/Cucumber', 'Couverture >90%'],
    security: ['JWT', 'Spring Security', 'CORS', 'CSRF', 'OWASP', 'RGPD', 'Audit sécurité'],
    devops: ['Docker', 'GitHub Actions', 'Jenkins', 'Maven', 'Git/GitFlow', 'SonarQube'],
    architecture: ['Microservices', 'Reactive Programming', 'REST API', 'SSE', 'WebSockets', 'UML']
  };

  experiences = [
    {
      company: 'OpenClassrooms',
      period: 'Juillet 2024 - Octobre 2025',
      position: 'Certification Expert en Développement Logiciel',
      description: 'Formation certifiante niveau 7 (BAC+5) - Spécialités Angular et Spring',
      achievements: [
        '12 projets techniques validés avec innovations pédagogiques (onglet : Projets OpenClassrooms)',
        'Premier étudiant à maîtriser l\'architecture réactive full-stack de bout en bout (front/back/db) selon mentor et évaluateur',
        'Développement d\'applications déployées en production avec CI/CD complet',
        'Site de veille technologique Angular 19 : veille.cpierres.dscloud.me'
      ]
    },
    {
      company: 'Acteos (Éditeur SCM)',
      period: 'Novembre 2021 - Mai 2024',
      position: 'Expert Oracle ADF et Team Leader Java',
      description: 'Leadership technique et migration technologique',
      achievements: [
        'Migration d\'ADF 12.2.1.2 vers 12.2.1.4 pour l\'ensemble des modules',
        'Développement de briques transversales sur framework ADF (Quartz scheduler, Oracle JET)',
        'Intégration continue Jenkins avec tests automatisés et déploiements',
        'Formation équipe de 20 jours sur stack Spring/Angular/Kafka',
        'Participation projet SaaS multi-tenants en architecture hexagonale'
      ]
    },
    {
      company: 'Larco - Setmat',
      period: 'Septembre 2017 - Octobre 2021',
      position: 'Architecte Lead Developer',
      description: 'Architecture et développement de framework ERP',
      achievements: [
        'Migration ERP d\'ADF 11.1.2.2 vers 12.2.1.3',
        'Framework WebSocket et Database Change Notifications',
        'Migration Subversion vers Git avec formation équipe'
      ]
    },
    {
      company: 'Acteos (Éditeur SCM)',
      period: 'Février 2015 - Septembre 2017',
      position: 'Architecte ADF Senior - Premier passage',
      description: 'Redéfinition de l\'architecture ERP et management international',
      achievements: [
        'Redéfinition de l\'architecture de l\'ERP TMS en ADF',
        'Framework ADF complet avec sécurité multi-organisations',
        'Animation d\'équipe de 10 développeurs ADF au Liban',
        'Mise en place Wiki Confluence et industrialisation'
      ]
    },
    {
      company: 'Missions Consulting',
      period: 'Janvier 2014 - Janvier 2015',
      position: 'Consultant Principal ADF et SOA',
      description: 'EXL Group, Easyteam - Frameworks ADF et technologies SOA',
      achievements: [
        'Mise en place de frameworks ADF pour réécriture ERP Forms',
        'Formation d\'équipes de développeurs',
        'Apprentissage du stack SOA (BPEL, OSB, BAM)',
        'Expertise en migration d\'applications legacy'
      ]
    },
    {
      company: 'Axin',
      period: 'Mars 2013 - Décembre 2013',
      position: 'Architecte Développeur',
      description: 'Refonte d\'ERP Oracle Forms vers Java ADF',
      achievements: [
        'Architecture et développement de solutions JEE',
        'Migration technologique Forms → ADF',
        'Conception de frameworks personnalisés'
      ]
    },
    {
      company: 'Gouvernement Nouvelle-Calédonie',
      period: 'Mai 2008 - Mars 2013',
      position: 'Architecte J2EE - Directeur Pôle BI',
      description: 'Architecture et management d\'équipe de 15 personnes',
      achievements: [
        'Gestion de 60 applications (50 en ADF 10g, 10 en 11g)',
        'Mise en place normes développement et framework ADF',
        'Industrialisation avec Confluence, Jira, Bamboo',
        'Formation et encadrement des équipes techniques'
      ]
    },
    {
      company: 'Diverses Missions',
      period: '2004 - 2008',
      position: 'Consultant Senior J2EE',
      description: 'Metro Cash & Carry, Nouvelles Frontières, Digora, Greta 92',
      achievements: [
        'Intranet J2EE multi-langues et Self-audit/Self-reporting',
        'Applications Web transactionnelles (200 agences)',
        'Formation et méthodologie pour éditeurs de logiciels',
        'Certification Cisco CCNA1'
      ]
    },
    {
      company: 'Cross-Systems / Micropole-Univers',
      period: 'Février 1999 - Novembre 2004',
      position: 'Directeur Pôle BI - Consultant Senior J2EE/ADF',
      description: 'Expertise Business Intelligence et solutions e-business',
      achievements: [
        'Consultant senior : développement, formation, avant-vente',
        'Management d\'équipe et direction du pôle BI',
        'Conception de frameworks java',
        'Animation de séminaires techniques'
      ]
    }
  ];

  education = [
    {
      degree: 'Expert en Développement Logiciel',
      school: 'OpenClassrooms',
      year: '- 2025',
      level: 'Niveau 7 (BAC+5)',
      specialization: 'Angular/Spring - RNCP 36912'
    },
    {
      degree: 'DUT Techniques de Commercialisation',
      school: 'IUT de Sceaux',
      year: '',
      level: 'BAC+2',
      specialization: 'Marketing'
    }
  ];

  certifications = [
    'Certification 2025 - RNCP36912 Expert en Développement logiciel (spécialité Angular/Spring)',
    'Certification Oracle ADF 11g',
    'Certification Sun Java Developer (310-025)',
    'Certification Sun Web Components (310-080)',
    'Certification Cisco CCNA1',
    'Anglais B2 - TOEIC 760',
    'Formation UML (Pascal Roques - 5 jours)'
  ];

  languages = [
    { name: 'Français', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Courant (B2, TOEIC 760)' }
  ];

  interests = [
    'Veille technologique et R&D',
    'Sports nautiques (jetsurf, voile)',
    'Cyclisme et randonnée',
    'Secourisme (SST valide)',
    'Technologies émergentes'
  ];

  downloadCV(format: 'short' | 'long'): void {
    const filename = format === 'short' ? 'CV-Christophe-Pierres-Court.md' : 'CV-Christophe-Pierres-Complet.md';
    const content = format === 'short' ? this.generateShortCV() : this.generateLongCV();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateShortCV(): string {
    return `# Christophe Pierrès
**Développeur Full-Stack Expert • Angular/Spring • Architecte Solutions**

📧 cpierres@hotmail.com | 📞 +33 (0) 781 425 406 | 📍 Tourcoing (59)
🔗 [LinkedIn](https://www.linkedin.com/in/christophe-pierres) | [GitHub](https://github.com/cpierres) | [Veille Tech](https://veille.cpierres.dscloud.me/)

---

## Synthèse Professionnelle

Expert en développement full-stack avec **25 ans d'expérience** en architecture JEE/Spring. Récemment certifié **niveau 7 (BAC+5)** OpenClassrooms avec spécialisation Angular/Spring. **Premier étudiant** à maîtriser l'architecture réactive complète selon évaluateurs. Leadership technique confirmé avec management d'équipes et expertise DevOps.

---

## Compétences Techniques

**Frontend :** Angular 14 à 20, TypeScript, RxJS, Angular Material, Signals
**Backend :** Spring WebFlux, Spring Boot 3, R2DBC, PostgreSQL, Kafka
**Testing :** JUnit 5, Jest, Cypress, TestBed, Mockito, TDD/BDD, Gherkin/Cucumber, Couverture >90%
**Sécurité :** JWT, Spring Security, CORS, CSRF, OWASP, RGPD, Audit sécurité
**Testing :** JUnit 5, Jest, Cypress, TestBed, Mockito, TDD/BDD, Couverture >90%
**DevOps :** Docker, GitHub Actions, CI/CD, Maven, Git/GitFlow, SonarQube
**Architecture :** Microservices, Reactive Programming, REST API, UML

---

## Expérience Professionnelle Récente

### OpenClassrooms | Juillet 2024 - Octobre 2025
**Certification Expert en Développement Logiciel - Niveau 7 (BAC+5)**
- 12 projets techniques validés avec innovations pédagogiques
- Développement d'applications en architecture réactive full-stack
- Site de veille technologique : [veille.cpierres.dscloud.me](https://veille.cpierres.dscloud.me/)

### Acteos (Éditeur SCM) | Novembre 2021 - Mai 2024
**Expert Oracle ADF et Team Leader Java**
- Migration technologique ADF et formation équipe sur stack moderne
- Intégration continue avec Jenkins
- Participation projet SaaS multi-tenants (Spring, Angular, Kafka)

### Larco - Setmat | Septembre 2017 - Octobre 2021
**Architecte Lead Developer**
- Migration ERP et développement de framework WebSocket

---

## Formation

**Expert en Développement Logiciel** - OpenClassrooms (2025) - Niveau 7 (BAC+5)
**DUT Techniques de Commercialisation** - Option Marketing - IUT de Sceaux

---

## Certifications Clés

- Certification Oracle ADF 11g
- Sun Java Developer & Web Components
- Cisco CCNA1
- Anglais B2 (TOEIC 760)

---

**Disponibilité :** Immédiate | **Mobilité :** France entière | **Remote :** Possible`;
  }

  private generateLongCV(): string {
    return `# Christophe Pierrès
**Développeur Full-Stack Expert • Angular/Spring • Architecte Solutions**

**40 rue de Roncq - 59100 Tourcoing**
📧 cpierres@hotmail.com | 📞 +33 (0) 781 425 406
🔗 [LinkedIn](https://www.linkedin.com/in/christophe-pierres) | [GitHub](https://github.com/cpierres)
🌐 [Veille technologique - Portfolio](https://veille.cpierres.dscloud.me/) | 👨‍👩‍👧‍👦 Marié, 2 enfants

---

## Synthèse des Compétences

Expert en développement full-stack avec **25 ans d'expérience** en architecture JEE/Spring. Récemment certifié **niveau 7 (BAC+5)** OpenClassrooms - Expert en Développement Logiciel (RNCP 36912). **Premier étudiant** à maîtriser l'architecture réactive complète (Angular + Spring WebFlux + R2DBC) selon évaluateurs.

**Expertise technique :**
- Architecture et développement d'applications JEE et Spring modernes
- Développement full-stack : Angular 19 + Spring WebFlux + PostgreSQL réactif
- Intégration continue : Maven, Jenkins, Git/GitHub, Docker, SonarQube
- Management d'équipes techniques et méthodologies Agile/SCRUM
- Formation et animation de séminaires techniques

**Spécialisations avancées :**
- Architecture réactive end-to-end (maîtrise complète front/back/db)
- Microservices avec communication temps réel (WebSocket, SSE)
- DevOps et CI/CD avec GitHub Actions et Docker
- Migration et modernisation d'applications legacy

---

## Expérience Professionnelle

### OpenClassrooms | Juillet 2024 - Août 2025
**Certification Expert en Développement Logiciel - Niveau 7 (BAC+5)**
*Spécialités Angular et Spring - RNCP 36912*

**Projets réalisés (13 projets validés) :**
- Développement d'applications Angular 19 avec architecture réactive complète
- Backend Spring WebFlux avec base PostgreSQL réactive (R2DBC)
- Réseau social full-stack avec chat temps réel et streaming sans blocage
- Site de veille technologique complet : [veille.cpierres.dscloud.me](https://veille.cpierres.dscloud.me/)
- Stratégie de tests complète (unitaires, intégration, E2E avec Cypress)
- Pipeline CI/CD avec GitHub Actions, Docker, SonarQube
- Architecture microservices avec conformité RGPD

**Innovation pédagogique :**
- Premier étudiant à créer un site Angular complet vs blog classique
- Premier étudiant à maîtriser WebFlux/R2DBC selon évaluateurs
- Déploiements professionnels sur infrastructure personnelle

### Acteos (Éditeur de SCM) | Novembre 2021 - Mai 2024
**Expert Oracle ADF et Team Leader Java**

**Responsabilités techniques :**
- Leader technique de l'équipe Java pour les modules Oracle ADF
- Migration des modules ADF de 12.2.1.2 vers 12.2.1.4
- Développement de briques transversales (intégration Quartz scheduler)
- Intégration de graphiques décisionnels Oracle JET dans ADF
- API REST pour piloter JasperReports

**Évolution technologique :**
- Participation au projet SaaS multi-tenants (Spring, Angular, Kafka)
- Formation intensive de 20 jours sur le nouveau stack par partenaire
- Acquisition des bonnes pratiques Spring (JPA, Spring Data), Kafka, Angular
- Architecture hexagonale et patterns modernes

### Larco - Setmat | Septembre 2017 - Octobre 2021
**Architecte Lead Developer**

**Modernisation technique :**
- Migration ERP d'ADF 11.1.2.2 vers 12.2.1.3
- Amélioration du framework Oracle ADF/JHeadstart
- Framework pour gérer le mode push (ADS, WebSocket, DatabaseChangeNotifications)
- Persistance des personnalisations utilisateurs avec MDS

**DevOps et méthodologies :**
- Migration Subversion vers Git avec formation avancée des développeurs
- Workflow Git Flow et bonnes pratiques de versioning
- Intégration continue avec Jenkins (environnement distribué)
- Tests automatisés JUnit/Selenium

### Gouvernement de Nouvelle-Calédonie | Mai 2008 - Mars 2013
**Architecte J2EE - Directeur Pôle Business Intelligence**

**Management et architecture :**
- Management d'une équipe de 15 personnes
- Gestion de 60 applications (50 en ADF 10g, 10 en 11g)
- Mise en place des normes de développement et framework ADF
- Architecture de système d'alertes et formations techniques

**Industrialisation :**
- Intégration continue avec Confluence, Jira, Bamboo
- Optimisation des applications existantes
- Formation et montée en compétences des équipes

### Autres Expériences Significatives
- **Cross-Systems/Micropole-Univers** (1999-2004) : Directeur de pôle BI, Consultant senior J2EE/ADF
- **Metro Cash And Carry France** (2005-2007) : Ingénieur systèmes, intranet J2EE
- **Diverses missions consulting** : Formation, avant-vente, management d'équipe

---

## Formation & Certifications

**Formation principale :**
- **Expert en Développement Logiciel** - OpenClassrooms (2025) - Niveau 7 (BAC+5)
  - Spécialités Angular et Spring - RNCP 36912
  - 13 projets techniques avec innovations pédagogiques
- **DUT Techniques de Commercialisation** - option marketing - IUT de Sceaux

**Formations techniques spécialisées :**
- Formation Spring Boot/Spring Data, JavaScript, TypeScript, Angular (21 jours)
- Formation Kafka (3 jours)
- Formation UML avec Pascal Roques (5 jours)
- 30+ formations UDEMY (Spring, Angular, DevOps, IA)

**Certifications :**
- Certification Oracle ADF 11g
- Certification Sun Java Developer (310-025)
- Certification Sun Web Components (310-080)
- Certification Cisco CCNA1
- Anglais courant (B2, TOEIC 760)

---

## Compétences Techniques Détaillées

**Technologies Frontend :**
- Angular 19 + Signals, TypeScript, RxJS, Angular Material
- WebSocket, Server-Side Events (SSE), Progressive Web Apps
- Responsive Design, UX/UI moderne

**Technologies Backend :**
- Spring WebFlux (architecture réactive), Spring Boot 3, Spring Security
- JPA/Spring Data, R2DBC (base de données réactive)
- PostgreSQL, Oracle, MySQL
- Apache Kafka, JMS, API REST

**Testing & Qualité :**
- Tests unitaires : JUnit 5, Jest, TestBed, Mockito
- Tests d'intégration : Spring Test, TestContainers
- Tests End-to-End : Cypress, Selenium WebDriver
- Tests comportementaux : Gherkin/Cucumber, spécifications exécutables
- Méthodologies : TDD/BDD, développement piloté par les tests
- Couverture de code >90%, Quality Gates SonarQube

**Sécurité & Conformité :**
- Authentification : JWT, OAuth2, Spring Security
- Protection : CORS, CSRF, validation des entrées
- Standards : OWASP Top 10, bonnes pratiques sécuritaires
- Conformité : RGPD, audit de sécurité, analyse des vulnérabilités
- Chiffrement et protection des données sensibles

**DevOps & Outils :**
- Docker & Docker Compose, Kubernetes (notions)
- CI/CD : GitHub Actions, Jenkins, Maven Release Plugin
- Git/GitFlow, SonarQube, Quality Gates
- Intégration continue, tests automatisés

**Architecture & Méthodologies :**
- Microservices, Event-Driven Architecture, CQRS
- Domain-Driven Design, Architecture hexagonale
- UML, Merise, Agile/SCRUM, Management d'équipes
- Conformité RGPD, sécurité applicative

---

## Réalisations Remarquables

**Innovation technique :**
- Premier étudiant à maîtriser l'architecture réactive full-stack (front/back/db)
- Site de veille technologique Angular 19 : architecture SPA complète
- Applications déployées en production avec infrastructure personnelle
- Pipeline CI/CD complet avec GitHub Actions et Docker

**Leadership et formation :**
- Management d'équipe de 15 personnes (Directeur Pôle BI)
- Formation de 20+ développeurs sur les technologies modernes
- Animation de séminaires techniques et ateliers
- Rédaction de documentation technique et bonnes pratiques

**Projets d'envergure :**
- Migration d'ERP complexes (Oracle Forms vers ADF)
- Architecture de 60 applications en production
- Développement de frameworks personnalisés
- Intégration de systèmes temps réel (WebSocket, notifications)

---

## Langues

- **Français :** Langue maternelle
- **Anglais :** Courant (B2, TOEIC 760)

---

## Centres d'Intérêt

- **Veille technologique :** R&D sur les architectures modernes
- **Sports :** Jetsurf, voile, bateau (permis côtier et fluvial), Vélo, ski, handiski
- **Secourisme :** SST
- **Voyages et découvertes culturelles**

---

## Disponibilité & Mobilité

**Disponibilité :** Ouvert aux opportunités
**Mobilité :** France entière
**Télétravail :** Possible et maîtrisé
**Permis :** Auto (B), Moto (A3)

---

## Objectifs Professionnels

Recherche de postes en **architecture et développement full-stack Spring/Angular**, **responsable d'applications**, **team lead technique** ou **formation/consulting**. Fort intérêt pour les projets impliquant :

- Migration d'applications legacy vers architectures modernes
- Mise en place d'architectures réactives et microservices
- Leadership technique et formation d'équipes
- Projets avec enjeux de scalabilité et performance
- Méthodologies Agile et DevOps avancées`;
  }
}
