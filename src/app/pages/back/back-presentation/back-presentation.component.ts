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
import {BackWebmvcVsWebfluxComponent} from '../back-webmvc-vs-webflux/back-webmvc-vs-webflux.component';
import {BackWebmvcWebfluxComponent} from '../back-webmvc-webflux/back-webmvc-webflux.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {LinkInfoComponent} from '../../../component/link-info/link-info.component';

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
    ClassementComponent,
    BackWebmvcVsWebfluxComponent,
    BackWebmvcWebfluxComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatTab,
    MatTabGroup,
    LinkInfoComponent
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
      name: 'Spring Web / Spring MVC (Spring Boot starter Web)',
      link: 'https://docs.spring.io/spring-framework/reference/web.html',
      choice: '2',
      advantages: [
        'Prise en charge robuste pour la création de services REST.',
        'Documentation complète et active.',
        'Facilité d’intégration avec d’autres modules de Spring Framework.'
      ],
      disadvantages: [
        'Utilise un modèle bloquant basé sur un thread par requête, ce qui peut entraîner une consommation élevée de ressources et limiter la performance ainsi que la scalabilité dans des applications à forte charge ou nécessitant des appels longs ou non bloquants. (pourrait s\'améliorer dans le futur grâce aux Virtual Thread, sans atteindre les capacités de Webflux)'
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
      choice: '1',
      advantages: [
        'Prend en charge la programmation réactive (non bloquante).',
        'Idéal pour les applications à haute performance nécessitant un grand nombre de connexions simultanées.',
        'Meilleure performance avec moins de ressources pour les applications asynchrones.'
      ],
      disadvantages: [
        'Complexité accrue comparée à Spring Web/MVC.',
        'Moins d\'automatismes qu\'avec Spring Web/MVC.',
        'Plus récent que Spring Web/MVC, moins mature, moins utilisé',
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
            name: 'De technology.amis.nl : Blocking vs non-blocking: R2DBC vs JDBC and WebFlux vs Web MVC',
            link: 'https://technology.amis.nl/software-development/performance-and-tuning/spring-blocking-vs-non-blocking-r2dbc-vs-jdbc-and-webflux-vs-web-mvc/',
            title: 'Excellent comparatif et benchmark de technology.amis.nl '
          },
          {
            name: 'baeldung.com/spring-webflux',
            link: 'https://www.baeldung.com/spring-webflux',
            title: 'Tutoriels Spring WebFlux sur Baeldung'
          },

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
    },
    {
      name: 'Spring WebClient',
      link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#webflux-client',
      advantages: [
        'Support réactif non bloquant pour les appels HTTP sortants.',
        'Idéal pour les architectures microservices et les systèmes réactifs.',
        'Flexibilité dans la gestion des appels asynchrones.'
      ],
      disadvantages: [
        'Complexité légèrement supérieure à RestTemplate.',
        'Nécessite d\'être familier avec la programmation réactive.'
      ],
      features: [
        'Prise en charge des protocoles HTTP réactifs via Project Reactor.',
        'Compatible avec Mono et Flux pour les flux de données réactifs.',
        'Support des paradigmes modernes et des APIs réactives.'
      ],
      useCases: [
        'Consommation d’APIs tierces dans un backend sécurisé.',
        'Appels entre microservices dans des architectures backend complexes.',
        'Gestion d’appels asynchrones ou parallèles pour haute performance.'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-framework',
          title: 'Dépôt officiel de Spring Framework',
        },
        siteAvis: [
          {
            name: 'Guides Spring WebClient',
            link: 'https://www.baeldung.com/spring-webclient',
            title: 'Tutoriels Baeldung pour Spring WebClient'
          },
          {
            name: 'Spring Documentation',
            link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html',
            title: 'Documentation officielle Spring WebFlux Client'
          }
        ]
      }
    },
    {
      name: 'Spring RestTemplate',
      link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#spring-web',
      title: 'deprécié depuis Spring 5',
      choice: '0',
      advantages: [
        'Client REST simple et facile à configurer.',
        'Idéal pour les services REST synchrones dans des architectures simples.',
        'Documentation bien établie avec de nombreux exemples et ressources.'
      ],
      disadvantages: [
        'Déprécié dans Spring 5, remplacé par WebClient pour les nouvelles applications.',
        'Bloquant, ce qui le rend peu performant dans des contextes nécessitant une forte scalabilité.'
      ],
      features: [
        'Support des requêtes HTTP synchrones (GET, POST, PUT, DELETE).',
        'Transformations automatiques des réponses JSON via Jackson.',
        'Facilité d’utilisation pour des scénarios rapides/scenarios prototypes.'
      ],
      useCases: [
        'Applications monolithiques ne nécessitant pas d’approche réactive.',
        'Consommation d’API tierces de manière simple dans des infrastructures existantes.',
        'Requêtes synchrones dans des applications où le modèle bloquant est acceptable.'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-framework',
          title: 'Dépôt officiel de Spring Framework',
        },
        siteAvis: [
          {
            name: 'Baeldung RestTemplate',
            link: 'https://www.baeldung.com/rest-template',
            title: 'Guide d’utilisation de RestTemplate'
          },
          {
            name: 'Spring Documentation',
            link: 'https://docs.spring.io/spring-framework/reference/web.html',
            title: 'Documentation officielle de Spring RestTemplate'
          }
        ]
      }
    }
  ];

  titleLink:string = 'Sites de référence :';
  sites:LinkInfo[] = [
    {
      name: 'udemy : spring framework 6 beginner to guru',
      link:'https://www.udemy.com/course/spring-framework-6-beginner-to-guru/'
    }
    ,{
      name: 'udemy : reactive programming with spring framework 5',
      link:'https://www.udemy.com/course/reactive-programming-with-spring-framework-5/'
    }

  ];
}
