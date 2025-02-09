import {Component} from '@angular/core';
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
import {TestLibraryUi} from '../../../core/models/TestLibraryUi';

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
    DecimalPipe
  ],
  templateUrl: './testing-libraries.component.html',
  styleUrl: './testing-libraries.component.css',
  standalone: true
})

export class TestingLibrariesComponent {
  displayedColumns: string[] = [
    'name',
    'typeDeTest',
    'caracteristiques',
    'pointsForts',
    'pointsFaibles',
    'references',
  ];
  testLibraries: TestLibraryUi[] = [
    {
      name: 'Jasmine',
      link: 'https://jasmine.github.io/',
      choice: '2',
      typeDeTest: 'Unit Testing',
      caracteristiques: [
        'Framework de test unitaire populaire',
        'Écrit en JavaScript',
        'Approche BDD (Behavior Driven Development)'
      ],
      pointsForts: [
        'Syntaxe simple et facile à comprendre',
        'Bien adapté aux tests frontend',
        'Écosystème mature et bien documenté',
        'Intégré par défaut dans Angular'
      ],
      pointsFaibles: [
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
            name: 'reddit: jasmine vs jest',
            link: 'https://www.reddit.com/r/Angular2/comments/oa800b/which_one_is_better_for_unit_test_jest_or_jasmine/'
          },
          {
            name: 'SoftwareTestingHelp',
            link: 'https://www.softwaretestinghelp.com/jasmine/'
          }
        ]
      }
    },
    {
      name: 'Karma',
      link: 'https://karma-runner.github.io/',
      choice: '2',
      typeDeTest: 'Test Runner',
      caracteristiques: [
        'Permet l’exécution des tests dans des navigateurs réels',
        'Compatible avec plusieurs frameworks (Jasmine, Mocha, etc.)',
        'Intégration avec CI/CD (Continuous Integration)'
      ],
      pointsForts: [
        'S’exécute sur plusieurs navigateurs',
        'Prend en charge de nombreux frameworks de test',
        'Intégré par défaut dans Angular'
      ],
      pointsFaibles: [
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
            name: 'TestProject',
            link: 'https://blog.testproject.io/karma/'
          },
          {
            name: 'Guru99',
            link: 'https://www.guru99.com/introduction-to-karma-runner.html'
          }
        ]
      }
    },
    {
      name: 'TestBed',
      link: 'https://angular.io/guide/testing-components-basics',
      choice: '2',
      typeDeTest: 'Unit Testing (Angular Test Framework)',
      caracteristiques: [
        'Solution native pour le test unitaire dans Angular',
        'Permet de tester les composants, modules et services Angular',
        'S’appuie sur Jasmine et Karma pour l’exécution'
      ],
      pointsForts: [
        'Solution introduite et maintenue directement par Angular',
        'Excellente intégration avec le framework Angular',
        'Prend en charge les tests unitaires et semi-intégrés'
      ],
      pointsFaibles: [
        'Dépend de Karma pour l’exécution, ce qui peut être lent',
        'Limité aux tests d’unités ou composés liés à Angular'
      ],
      references: {
        github: {
          repo: 'https://github.com/angular/angular',
          title: '(sous-ensemble de Angular)',
          stars: 97000,
          forks: 25800
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/angular-testbed'
          },
          {
            name: 'Testing Angular Guide',
            link: 'https://testing-angular.com/'
          },
          {
            name: 'Angular Official Docs',
            link: 'https://angular.io/guide/testing-components-basics'
          }
        ]
      }
    },
    {
      name: 'Jest',
      link: 'https://jestjs.io/',
      choice: '1',
      typeDeTest: 'Unit Testing / Integration Testing',
      caracteristiques: [
        'Framework tout-en-un : assertion, mocking, backend intégrés',
        'Compatible avec JavaScript, TypeScript, Angular, React, Vue.js',
        'Approche moderne avec tests parallèles automatiques'
      ],
      pointsForts: [
        'Exécution des tests rapide grâce au parallélisme',
        'Le meilleur choix pour les projets modernes utilisant React ou Angular',
        'Excellent support des tests d’instantanés (snapshot testing)'
      ],
      pointsFaibles: [
        'Léger apprentissage requis pour les développeurs habitués à Jasmine/Karma',
        'Plus difficile à configurer pour les environnements multi-navigateurs'
      ],
      references: {
        github: {
          repo: 'https://github.com/facebook/jest',
          stars: 44500,
          forks: 6500
        },
        siteAvis: [
          {
            name: 'StackShare',
            link: 'https://stackshare.io/jest'
          },
          {
            name: 'JavaScriptInfo',
            link: 'https://javascript.info/testing-jest'
          },
          {
            name: 'BetterDev',
            link: 'https://betterdev.blog/why-jest-framework/'
          }
        ]
      }
    },
    {
      name: 'Protractor',
      link: 'https://www.protractortest.org/',
      choice: '0',
      typeDeTest: 'E2E Testing',
      caracteristiques: [
        'Framework de test automatisé pour les applications Angular',
        'Support natif des synchronisations Angular',
        'Compatible avec Selenium et WebDriver'
      ],
      pointsForts: [
        'Conçu spécifiquement pour Angular',
        'Large support grâce aux API Selenium',
        'Bonne documentation officielle'
      ],
      pointsFaibles: [
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
          },
          {
            name: 'Guru99',
            link: 'https://www.guru99.com/introduction-protractor-angular-js.html'
          },
          {
            name: 'TestAutomationGuru',
            link: 'https://testautomationguru.com/using-protractor/'
          }
        ]
      }
    },
    {
      name: 'Cypress',
      link: 'https://www.cypress.io/',
      choice: '1',
      typeDeTest: 'E2E Testing',
      caracteristiques: [
        'Tests end-to-end interactifs pour les applications web modernes',
        'Rapports intégrés et faciles à configurer',
        'Moins dépendant d’environnements externes par rapport à d’autres outils'
      ],
      pointsForts: [
        'Excellente expérience utilisateur pour les tests frontend',
        'Facile à intégrer avec CI/CD',
        'Documentation bien écrite et claire'
      ],
      pointsFaibles: [
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
            name: 'TestAutomationGuru',
            link: 'https://testautomationguru.com/introduction-to-cypress/'
          },
          {
            name: 'SoftwareTestingHelp',
            link: 'https://www.softwaretestinghelp.com/cypress-tutorial/'
          }
        ]
      }
    }
  ];
}
