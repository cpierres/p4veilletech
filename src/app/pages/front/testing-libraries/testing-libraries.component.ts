import { Component } from '@angular/core';
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
import {NgForOf} from '@angular/common';
import { TestLibraryUi } from '../../../core/models/TestLibraryUi';

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
    MatHeaderRowDef
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
        'S’intègre facilement dans Angular CLI'
      ],
      pointsFaibles: [
        'Pas conçu pour exécuter les tests dans les navigateurs ou directement avec Node.js',
        'Pas conçu pour gérer les rythmes de test asynchrone avancés'
      ],
      references: {
        github: 'https://github.com/jasmine/jasmine',
        siteAvis: 'https://stackshare.io/jasmine'
      }
    },
    {
      name: 'Karma',
      link: 'https://karma-runner.github.io/',
      typeDeTest: 'Test Runner',
      caracteristiques: [
        'Permet l’exécution des tests dans des navigateurs réels',
        'Compatible avec plusieurs frameworks (Jasmine, Mocha, etc.)',
        'Intégration avec CI/CD (Continuous Integration)'
      ],
      pointsForts: [
        'S’exécute sur plusieurs navigateurs',
        'Prend en charge de nombreux frameworks de test',
        'S’intègre facilement dans Angular CLI'
      ],
      pointsFaibles: [
        'Configuration complexe pour certains projets',
        'Performance plus lente par rapport aux solutions modernes comme Jest'
      ],
      references: {
        github: 'https://github.com/karma-runner/karma',
        siteAvis: 'https://stackshare.io/karma'
      }
    },
    {
      name: 'Jest',
      link: 'https://jestjs.io/',
      typeDeTest: 'Unit Testing / Integration Testing',
      caracteristiques: [
        'Framework tout-en-un : assertion, mocking, backend intégrés',
        'Compatible avec JavaScript, TypeScript, React, Angular, Vue.js',
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
        github: 'https://github.com/facebook/jest',
        siteAvis: 'https://stackshare.io/jest'
      }
    },
    {
      name: 'Cypress',
      link: 'https://www.cypress.io/',
      typeDeTest: 'End-to-End Testing',
      caracteristiques: [
        'Framework moderne dédié aux tests end-to-end',
        'Conçu pour écrire rapidement des tests lisibles',
        'Debugging intuitif avec capture vidéo/screenshot par défaut'
      ],
      pointsForts: [
        'Configuration simple et rapide',
        'Tests rapides et fiables',
        'Idéal pour les tests end-to-end modernes'
      ],
      pointsFaibles: [
        'Pas conçu pour les tests unitaires',
        'Limité à Chromium-based pour l’exécution locale'
      ],
      references: {
        github: 'https://github.com/cypress-io/cypress',
        siteAvis: 'https://stackshare.io/cypress'
      }
    }
  ];
}
