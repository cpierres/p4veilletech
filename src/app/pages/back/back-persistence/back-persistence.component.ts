import {Component} from '@angular/core';
import {ComparatifSolution} from '../../../core/models/ComparatifSolution';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {ClassementComponent} from '../../../component/classement/classement.component';

@Component({
  selector: 'app-back-persistence',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    NgForOf,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    NgIf,
    MatCard,
    MatDivider,
    DecimalPipe,
    ClassementComponent
  ],
  templateUrl: './back-persistence.component.html',
  styleUrl: './back-persistence.component.css'
})
export class BackPersistenceComponent {
  displayedColumns: string[] = [
    'name',
    'useCases',
    'features',
    'advantages',
    'disadvantages',
    'references'
  ];

  solutions: ComparatifSolution[] = [
    {
      name: 'Spring Data JPA',
      link: 'https://spring.io/projects/spring-data-jpa',
      choice: '1',
      title: 'A choisir pour application flexible',
      advantages: [
        'Facilité d’utilisation grâce aux abstractions de Spring',
        'Compatible directement avec Spring Boot',
        'Réduction du code standard (boilerplate)'
      ],
      disadvantages: [
        'Moins flexible pour les cas complexes',
        'Certaines dépendances à Hibernate pour les fonctionnalités avancées',
        'Performance moindre que JDBC pur'
      ],
      features: ['Repositories Spring', 'Abstractions JPA', 'Support des requêtes JPQL'],
      useCases: [
        'Applications CRUD basiques ou moyennement complexes',
        'Projets axés sur la facilité d’intégration',
        'Rapidité de mise en oeuvre pour les Minimal Viable Product ou les prototypes'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-data-jpa',
          stars: 3100,
          forks: 1400
        },
        siteAvis: [
          {
            name: 'Performance/Optimisation',
            link: 'https://www.sfeir.dev/back/probleme-n-1-en-spring-data-jpa-decouvrez-comment-optimiser-vos-requetes-avec-lannotation-query-2/'
          },
          {
            name: 'Critique custom repository',
            link: 'https://blog.alexis-hassler.com/2021/07/09/spring-custom-repository.html'
          },
          {
            name: 'Comparatifs en bas du tableau',
            link: '#'
          }

        ]
      }
    },
    {
      name: 'Spring Data JDBC',
      link: 'https://spring.io/projects/spring-data-jdbc',
      advantages: [
        'Performance brute la plus rapide',
        'Contrôle total sur les interactions avec la base',
        'Pas de surcouche inutile : approche directe'
      ],
      disadvantages: [
        'Code standard important (boilerplate)',
        'Pas de fonctionnalités ORM ou JPA',
        'Maintenance plus difficile à grande échelle'
      ],
      features: ['SQL natif', 'Gestion des transactions via Spring', 'Support JDBC'],
      useCases: [
        'Applications simples ou performantes où ORM n’est pas nécessaire',
        'Petits projets où le surcoût d’un ORM est inutile',
        'Projets hérités ou projets nécessitant une flexibilité maximale'
      ],
      references: {
        github: {repo: 'https://github.com/spring-projects/spring-data-relational', stars: 786, forks: 351},
        siteAvis: [
          {
            name: 'Spring JDBC Documentation',
            link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#jdbc'
          },
          {
            name: 'Comparatifs en bas du tableau',
            link: '#'
          }
        ]
      }
    },
    {
      name: 'Spring Data MongoDB',
      link: 'https://spring.io/projects/spring-data-mongodb',
      advantages: [
        'Support natif pour MongoDB et NoSQL',
        'Simplicité d’intégration dans Spring Boot',
        'Support des requêtes MongoDB natives'
      ],
      disadvantages: [
        'Limité aux bases MongoDB',
        'Pas adapté pour des bases relationnelles classiques',
        'Apprentissage nécessaire pour des concepts NoSQL'
      ],
      features: ['NoSQL queries', 'Repositories MongoDB', 'MapReduce support'],
      useCases: [
        'Stockage de documents ou de données semi-structurées (JSON)',
        'Projets utilisant MongoDB comme système de database',
        'Applications orientées scalabilité horizontale (ajout de machines)'
      ],
      references: {
        github: {repo: 'https://github.com/spring-projects/spring-data-mongodb', stars: 1600, forks: 1100},
        siteAvis: [
          {
            name: 'Bon article (en français) sur expérience MongoDB',
            link: 'https://mongodb.developpez.com/actu/346157/-Au-revoir-MongoDB-le-temoignage-d-un-developpeur-qui-a-change-MongoDB-pour-PostgreSQL-il-revele-aussi-les-inconvenients-et-les-limites-du-SGBD-NoSQL/'
          }
        ]
      }
    },
    {
      name: 'Spring Data R2DBC',
      link: 'https://spring.io/projects/spring-data-r2dbc',
      choice: '2',
      title: 'Cohérent avec choix Spring Webflux pour forte montée en charge et rapidité',
      advantages: [
        'Support des interactions non-bloquantes avec les bases relationnelles',
        'Facilité d’intégration avec Spring WebFlux pour la programmation réactive',
        'Compatible avec des bases populaires comme Postgres, MySQL, etc.'
      ],
      disadvantages: [
        'Fonctionnalités limitées comparées à JPA/Hibernate',
        'Ne prend pas en charge les relations complexes comme les ORM',
        'Peut être difficile à appréhender pour les débutants',
        'Moins mature que Spring Data JPA, JDBC etc.'
      ],
      features: ['Programmation réactive', 'Modèle non-bloquant', 'Repositories réactifs'],
      useCases: [
        'Applications réactives avec interface utilisateur en temps réel',
        'Projets utilisant Spring WebFlux pour la scalabilité',
        'Microservices nécessitant des performances élevées et une faible empreinte mémoire'
      ],
      references: {
        github: {repo: 'https://github.com/spring-projects/spring-data-r2dbc', stars: 708, forks: 132},
        siteAvis: [
          {
            name: 'Avis reddit',
            link: 'https://www.reddit.com/r/SpringBoot/comments/18qtvut/why_are_docs_for_spring_data_r2dbc_so/?tl=fr'
          }
        ]
      }
    },
  ];

  comparatifsInfo: LinkInfo[] = [
    {
      name: 'Différences Spring Data JPA et Spring Data JDBC (reddit)',
      link: 'https://www.reddit.com/r/java/comments/kr4tnx/what_are_the_differences_between_spring_jpa/?tl=fr'
    },
    {
      name: 'Comparatif Spring Data JPA et Spring Data JDBC (medium)',
      link: 'https://medium.com/walmartglobaltech/a-cruncher-choice-jpa-or-jdbc-85c589f584a9#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYzUzNGZhNWI4Y2FjYTIwMWNhOGQwZmY5NmI1NGM1NjIyMTBkMWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk2NDMzNzMyODE5MjQ4NDEwNzYiLCJlbWFpbCI6ImNocmlzdG9waGUucGllcnJlc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzM5MjE4NTE1LCJuYW1lIjoiQ2hyaXN0b3BoZSBQaWVycsOocyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLd1lORklZX1EyRUVhZ0thVEttYTM0M2I3Q3FQVml6SE8za0xyZ25mbU03U3hpb25FZD1zOTYtYyIsImdpdmVuX25hbWUiOiJDaHJpc3RvcGhlIiwiZmFtaWx5X25hbWUiOiJQaWVycsOocyIsImlhdCI6MTczOTIxODgxNSwiZXhwIjoxNzM5MjIyNDE1LCJqdGkiOiIyY2M3NmNmODdlODVjMzUzNTFmMWM2OTE3YmU0ZjNjODBlYjM3M2Y2In0.2phUULWYAW8o3zS7gBMc-iJCJh2dtJp77KT2pgfJg96Pz-wDb4EjqLe6m21ewnPt5QBgh5yECo4EAOPus_Fa4Gz2IWaibkB5AX7nT1evycUeKlsGtlizexRxsylYXotPf1B6tnQdq_mRTynABgBA74V0a0S14cuoeluo6ItMf5BtrAY_CatBjekqMmCLpJPxJsrYykbgMgNLU7z-XuDXsVQeBzafvc1bVqIKS5uC4z0zw-cDBn6dKb1jiSuV7rNckXtqO5RsDQmSqrsJ_wM0ezs-8b8hh7l32JPkMqwh6o1JBE_n9j6gBqtVNeY5yL4IXJKjdi1VqHhtbyhEAHQtRw'
    },
    {
      name: 'Spring: Blocking vs non-blocking: R2DBC vs JDBC and WebFlux vs Web MVC',
      link: 'https://technology.amis.nl/software-development/performance-and-tuning/spring-blocking-vs-non-blocking-r2dbc-vs-jdbc-and-webflux-vs-web-mvc/',
      title: 'Excellent comparatif de technology.amis.nl '
    },
  ]
}
