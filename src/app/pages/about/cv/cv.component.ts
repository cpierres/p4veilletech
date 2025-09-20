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
    const filename = format === 'short'
      ? '2025-Christophe_Pierres_CV_court.pdf'
      : '2025-Christophe_Pierres_CV.pdf';

    const pdfPath = `/assets/pdf/cv/${filename}`;

    // Créer un lien temporaire pour télécharger le fichier PDF
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = filename;
    link.target = '_blank';
    link.click();
  }
}
