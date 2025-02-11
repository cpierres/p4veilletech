import {Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {ComparatifSolution} from '../../../core/models/ComparatifSolution';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {NgForOf} from '@angular/common';
import {ClassementComponent} from '../../../component/classement/classement.component';

@Component({
  selector: 'app-back-presentation',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCard,
    MatDivider,
    NgForOf,
    ClassementComponent
  ],
  templateUrl: './back-presentation.component.html',
  styleUrl: './back-presentation.component.css'
})

export class BackPresentationComponent {
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
      name: 'Spring Web (Spring Boot starter Web)',
      link: 'https://docs.spring.io/spring-framework/reference/web.html',
      choice: '1',
      advantages: [
        'Prise en charge robuste pour la création de services REST.',
        'Documentation complète et active.',
        'Facilité d’intégration avec d’autres modules de Spring Framework.'
      ],
      disadvantages: [
        'Peut être lourd pour des applications simples où une solution légère est suffisante.',
        'L’apprentissage peut être complexe pour les débutants.'
      ],
      features: [
        'Annotations REST telles que @RestController, @RequestMapping.',
        'Mapping automatique des requêtes HTTP vers les méthodes Java.',
        'Support des formats JSON et XML via Jackson et JAXB.'
      ],
      useCases: [
        'Application web et backend RESTful.',
        'Création rapide d’API REST pour la gestion des données.',
        'Intégration avec des bases de données via Spring Data.'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-boot',
          title: '',
          stars: 1000,
          forks: 1000
        },
        siteAvis: [
          {
            name: '',
            link: 'https://spring.io/guides',
            title: 'Guides officiels Spring'
          },
          {
            name: 'baeldung.com/spring-web',
            link: 'https://www.baeldung.com/rest-with-spring-series',
            title: 'Tutoriels Spring REST sur Baeldung'
          }
        ]
      }
    },
    {
      name: 'Spring WebFlux',
      link: 'https://docs.spring.io/spring-framework/reference/web-reactive.html',
      advantages: [
        'Prend en charge la programmation réactive (non bloquante).',
        'Idéal pour les applications à haute performance nécessitant un grand nombre de connexions simultanées.',
        'Meilleure performance avec moins de ressources pour les applications asynchrones.'
      ],
      disadvantages: [
        'Complexité accrue comparée à Spring Web.',
        'Moins adapté pour les applications qui ne nécessitent pas un modèle réactif.'
      ],
      features: [
        'Basé sur Project Reactor pour la programmation réactive.',
        'Support des annotations similaires à Spring Web, telles que @RestController.',
        'Support des flux non bloquants avec Mono et Flux.'
      ],
      useCases: [
        'Applications en temps réel nécessitant la gestion de nombreuses connexions.',
        'Applications traitant des flux de données massifs (par ex. streaming).',
        'Systèmes évolutifs avec des performances optimisées.'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-framework',
          title: 'Dépôt officiel Spring Framework (WebFlux inclus)'
        },
        siteAvis: [
          {
            name: 'Doc de référence',
            link: 'https://docs.spring.io/spring-framework/reference/web/webflux.html',
            title: 'Doc de référence'
          },
          {
            name: 'baeldung.com/spring-webflux',
            link: 'https://www.baeldung.com/spring-webflux',
            title: 'Tutoriels Spring WebFlux sur Baeldung'
          }
        ]
      }
    },
    {
      name: 'Spring Data REST',
      link: 'https://spring.io/projects/spring-data-rest',
      advantages: [
        'Génération automatique de fonctionnalités REST pour les entités de données.',
        'Réduction du temps de développement pour les CRUD simples.',
        'Facilité d’intégration avec Spring Data et ses repositories.'
      ],
      disadvantages: [
        'Moins flexible pour des API REST complexes nécessitant des opérations spécifiques.',
        'La génération automatique peut poser des problèmes de sécurité si mal configurée.'
      ],
      features: [
        'Expose automatiquement les repositories Spring Data en tant qu’API REST.',
        'Supporte automatiquement les formats JSON et HAL pour la navigation hypermédia.',
        'Intégration avec Spring HATEOAS pour ajouter des liens hypermédia aux réponses REST.'
      ],
      useCases: [
        'Applications nécessitant des API CRUD simples et rapides.',
        'Prototypes ou MVPs basés sur une base de données relationnelle ou NoSQL.',
        'Exposition rapide de données en tant qu’API REST sans écrire de code.'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-data-rest',
          title: 'Dépôt officiel Spring Data REST',
          stars: 931,
          forks: 564
        },
        siteAvis: [
          {
            name: 'Avis 1 sur reddit',
            link: 'https://www.reddit.com/r/SpringBoot/comments/1frd7nf/is_spring_data_rest_used_in_actual_production/',
            title: 'Is spring data rest used in actual production ?'
          },
          {
            name: 'Avis sur geeksforgeeks.org',
            link: 'https://www.geeksforgeeks.org/what-is-spring-data-rest/',
            title: 'What is Spring Data REST?'
          }
        ]
      }
    }
  ];
}
