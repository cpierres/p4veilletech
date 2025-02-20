import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
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
import {LinkInfo} from '../../../core/models/LinkInfo';
import {ComparatifSolution} from '../../../core/models/ComparatifSolution';
import {ClassementComponent} from '../../../component/classement/classement.component';
import {LinksInfoService} from '../../../core/services/links-info/links-info.service';
import {LinkInfoComponent} from '../../../component/link-info/link-info.component';

@Component({
  selector: 'app-testing-libraries',
  imports: [
    MatCard,
    MatDivider,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    NgForOf,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    NgIf,
    DecimalPipe,
    ClassementComponent,
    LinkInfoComponent
  ],
  templateUrl: './testing-libraries.component.html',
  styleUrl: './testing-libraries.component.css',
  standalone: true
})

export class TestingLibrariesComponent implements OnInit {
  sitesFrontTestTitle: string = 'Autres comparatifs et sites de référence';
  sitesFrontTest: LinkInfo[] = [];

  constructor(private linksInfoService: LinksInfoService) {
  }

  ngOnInit(): void {
    this.sitesFrontTest = this.linksInfoService.getSitesFrontTest();
  }

  displayedColumns: string[] = [
    'name',
    'useCases',
    'features',
    'advantages',
    'disadvantages',
    'references',
  ];
  testLibraries: ComparatifSolution[] = [
    {
      name: 'Jasmine',
      link: 'https://jasmine.github.io/',
      useCases: ['Unit Testing'],
      features: [
        'Framework de test unitaire populaire',
        'Écrit en JavaScript',
        'Approche BDD (Behavior Driven Development)'
      ],
      advantages: [
        'Intégré par défaut dans Angular',
        'Syntaxe simple et facile à comprendre',
        'Bien adapté aux tests frontend',
        'Écosystème mature et bien documenté',
      ],
      disadvantages: [
        'Pas conçu pour exécuter les tests dans les navigateurs ou directement avec Node.js',
        'Pas conçu pour gérer les rythmes de test asynchrone avancés'
      ],
      references: {
        github: {
          repo: 'https://github.com/jasmine/jasmine',
          stars: 15800,
          forks: 2200
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/jasmine'
          },
          {
            name: 'Comparatifs en bas du tableau',
            link: '#',
            title: 'Autres avis comparatifs en bas du tableau'
          },
        ]
      }
    },
    {
      name: 'Karma',
      link: 'https://karma-runner.github.io/',
      useCases: ['Test Runner'],
      features: [
        'Permet l’exécution des tests dans des navigateurs réels',
        'Compatible avec plusieurs frameworks (Jasmine, Mocha, etc.)',
        'Intégration avec CI/CD (Continuous Integration)'
      ],
      advantages: [
        'Intégré par défaut dans Angular',
        'S’exécute sur plusieurs navigateurs',
        'Prend en charge de nombreux frameworks de test',
      ],
      disadvantages: [
        'Configuration complexe pour certains projets',
        'Performance plus lente par rapport aux solutions modernes comme Jest'
      ],
      references: {
        github: {
          repo: 'https://github.com/karma-runner/karma',
          stars: 12000,
          forks: 1700
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/karma'
          },
          {
            name: 'Reddit :  Avis et linkInfo',
            link: 'https://www.reddit.com/r/angular/comments/17t085u/have_you_switched_away_from_karma_and_what_did/',
            title: 'Have you switched away from Karma? And what did you settle on'
          },
          {
            name: 'Comparatifs en bas du tableau',
            link: '#',
            title: 'Autres avis comparatifs en bas du tableau'
          },
        ]
      }
    },
    {
      name: 'TestBed',
      link: 'https://angular.dev/guide/testing/components-basics',
      choice: '1',
      useCases: ['Unit Testing (Angular Test Framework)'],
      features: [
        'Solution native pour le test unitaire dans Angular',
        'Permet de tester les composants, modules et services Angular',
        'Par défaut a besoin de Jasmine et Karma pour l’exécution',
        'Ou bien de Jest'
      ],
      advantages: [
        'Solution introduite et maintenue directement par Angular',
        'Excellente intégration avec Angular',
        'Prend en charge les tests unitaires et semi-intégrés'
      ],
      disadvantages: [
        'Dépend de Karma pour l’exécution, ce qui peut être lent (mais Jest peut remplacer Karma)',
        'Limité aux tests d’unités ou composés liés à Angular'
      ],
      references: {
        github: {
          repo: 'https://github.com/angular/angular',
          title: '(TestBed est un sous-ensemble de Angular)',
          stars: 97000,
          forks: 25800
        },
        siteAvis: [
          {
            name: 'Github issues',
            link: 'https://github.com/search?q=repo%3Aangular%2Fangular%20test%20bed&type=issues',
            title: 'Problèmes en cours sur TestBed'
          },
          {
            name: 'StackShare',
            link: 'https://stackshare.io/angular-testbed'
          },
          {
            name: 'Testing Angular Guide',
            link: 'https://testing-angular.com/'
          },
          {
            name: 'Tutoriel intéressant',
            link: 'https://danywalls.com/how-to-test-components-in-angular-using-testbed',
            title: 'Tutoriel permettant de se faire un avis'
          }
        ]
      }
    },
    {
      name: 'Jest',
      link: 'https://jestjs.io/',
      choice: '1',
      useCases: ['Unit Testing','Integration Testing'],
      features: [
        'Framework tout-en-un : assertion, mocking, backend intégrés',
        'Compatible avec JavaScript, TypeScript, Angular, React, Vue.js',
        'Approche moderne avec tests parallèles automatiques'
      ],
      advantages: [
        'Exécution des tests rapide grâce au parallélisme',
        'Le meilleur choix pour les projets modernes utilisant Angular ou React',
        'Excellent support des tests d’instantanés (snapshot testing)'
      ],
      disadvantages: [
        'Léger apprentissage requis pour les développeurs habitués à Jasmine/Karma',
        'Plus difficile à configurer pour les environnements multi-navigateurs'
      ],
      references: {
        github: {
          repo: 'https://github.com/jestjs/jest',
          stars: 44500,
          forks: 6500
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/jest'
          },
          {
            name: 'Comparatifs en bas du tableau',
            link: '#',
            title: 'Autres avis comparatifs en bas du tableau'
          },
        ]
      }
    },
    {
      name: 'Protractor',
      link: 'https://www.protractortest.org/',
      choice: '0',
      useCases: ['End-to-end (E2E) Testing' ],
      features: [
        'Framework de test automatisé pour les applications Angular',
        'Support natif des synchronisations Angular',
        'Compatible avec Selenium et WebDriver'
      ],
      advantages: [
        'Conçu spécifiquement pour Angular',
        'Large support grâce aux API Selenium',
        'Bonne documentation officielle'
      ],
      disadvantages: [
        'Déprécié depuis 2020 (recherche d’alternatives nécessaire)',
        'Capacité limitée pour les applications non-Angular'
      ],
      references: {
        github: {
          repo: 'https://github.com/angular/protractor',
          stars: 8700,
          forks: 2300
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/protractor'
          }
        ]
      }
    },
    {
      name: 'Cypress',
      link: 'https://www.cypress.io/',
      choice: '1',
      useCases: ['E2E Testing'],
      features: [
        'Tests end-to-end interactifs pour les applications web modernes',
        'Rapports intégrés et faciles à configurer',
        'Moins dépendant d’environnements externes par rapport à d’autres outils'
      ],
      advantages: [
        'Excellente expérience utilisateur pour les tests frontend',
        'Facile à intégrer avec CI/CD',
        'Documentation bien écrite et claire'
      ],
      disadvantages: [
        'Principalement conçu pour tester les navigateurs (pas d’autre type d’applications)'
      ],
      references: {
        github: {
          repo: 'https://github.com/cypress-io/cypress',
          stars: 46000,
          forks: 2900
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/cypress'
          },
          {
            name: 'Avis sur Reddit (vs playwright)',
            link: 'https://www.reddit.com/r/angular/comments/1h7lk81/opinions_on_playwright_and_cypress/',
            title: 'Opinions on playwright and cypress'
          },
          {
            name: 'Autre avis sur Reddit',
            link: 'https://www.reddit.com/r/Angular2/comments/184enjb/angular_component_testing_with_cypress/'
          },
          {
            name: 'OpenClassrooms : Cypress',
            link: 'https://openclassrooms.com/fr/courses/8157231-automatisez-des-tests-fonctionnels-pour-le-web-avec-cypress',
            title: 'Excellent tutoriel et avis d\'une experte'
          }
        ]
      }
    },
    {
      name: 'Playwright',
      link: 'https://playwright.dev/',
      useCases: ['E2E Testing'],
      features: [
        'Framework moderne pour le test E2E',
        'Compatible avec les navigateurs modernes (Chromium, Firefox, WebKit)',
        'Supporte les tests via plusieurs langages (JavaScript, TypeScript, Python, Java, C#)'
      ],
      advantages: [
        'Performances rapides grâce à des sessions de navigateur headless',
        'Fonctionnalités avancées comme les tests parallèles, les fixtures et les traces interactives',
        'Documentation riche et exemples faciles à suivre',
        'Automatisation multiplateforme (Windows, macOS, Linux)'
      ],
      disadvantages: [
        'Pas conçu pour les tests unitaires',
        'Configuration initiale plus complexe pour les débutants',
        'Maîtrise requise des promesses pour gérer les tests asynchrones'
      ],
      references: {
        github: {
          repo: 'https://github.com/microsoft/playwright',
          stars: 69200,
          forks: 3800
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/playwright'
          },
          {
            name: 'Reddit : avis Playwright (vs cypress et selenium)',
            link: 'https://www.reddit.com/r/Playwright/comments/14oaegw/a_comparative_analysis_of_playwright_adoption_vs/',
            title: 'Analyse comparative de l\'adoption de Playwright par rapport à Cypress et Selenium'
          }
        ]
      }
    }
  ];

}
