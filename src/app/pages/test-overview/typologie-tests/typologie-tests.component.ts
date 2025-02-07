import {Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {TestTypology} from '../../../core/models/TestTypology';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-typologie-tests',
  imports: [
    MatTableModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    NgForOf
  ],
  templateUrl: './typologie-tests.component.html',
  styleUrl: './typologie-tests.component.css',
  standalone: true,
})
export class TypologieTestsComponent {
  displayedColumns: string[] = [
    'typeTest',
    'description',
    'frontendTools',
    'backendTools',
    'angularExample',
    'springExample'
  ];

testTypologies: TestTypology[] = [
  {
    typeTest: 'Test Unitaire',
    description: 'Vérifie une fonction ou un module de manière isolée.',
    frontendTools: [
      {name: 'Jasmine', link: 'https://jasmine.github.io'},
      {name: 'Jest', link: 'https://jestjs.io'},
    ],
    backendTools: [
      {name: 'JUnit', link: 'https://junit.org/junit5/docs/current/user-guide/'},
      {name: 'Mockito', link: 'https://site.mockito.org'},
      {name: 'Spring Test', link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html'},
    ],
    angularExample: 'Tester une méthode de service ou composant avec Jasmine.',
    springExample: 'Tester les méthodes d’un service avec JUnit dans Spring.',
  },
  {
    typeTest: "Test d'Intégration",
    description: "Valide que les différentes parties communiquent correctement.",
    frontendTools: [
      {name: 'Jest', link: 'https://jestjs.io'},
    ],
    backendTools: [
      {name: 'Postman', link: 'https://www.postman.com'},
      {
        name: 'JUnit + Spring Test',
        link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html'
      },
      {name: 'Cucumber', link: 'https://cucumber.io/docs'},
      {name: 'TestContainers', link: 'https://www.testcontainers.org'},
      {name: 'Flyway', link: 'https://flywaydb.org/documentation/'},
    ],
    angularExample: "Tester l'interaction entre un service Angular et une API.",
    springExample: "Tester un contrôleur avec des services Spring, JUnit, Cucumber.",
  },
  {
    typeTest: "Test Fonctionnel",
    description: "Valide les fonctionnalités selon les besoins métier.",
    frontendTools: [
      {name: 'Cypress', link: 'https://docs.cypress.io'},
      {name: 'Cucumber', link: 'https://cucumber.io/docs'},
      {name: 'Playwright', link: 'https://playwright.dev'},
    ],
    backendTools: [
      {name: 'Cucumber + Gherkin', link: 'https://cucumber.io/docs/gherkin/'},
      {name: 'TestContainers', link: 'https://www.testcontainers.org'},
      {name: 'Flyway', link: 'https://flywaydb.org/documentation/'},
    ],
    angularExample: "Tester des formulaires avec Cypress ou Gherkin (BDD).",
    springExample: "Tester des flux utilisateurs backend écrits en Gherkin.",
  },
  {
    typeTest: "Test de Système",
    description: "Vérifie tout le système ou logiciel.",
    frontendTools: [
      {name: 'Selenium', link: 'https://www.selenium.dev/documentation/'},
      {name: 'TestCafe', link: 'https://testcafe.io/documentation'},
    ],
    backendTools: [
      {name: 'Selenium', link: 'https://www.selenium.dev/documentation/'},
      {name: 'Cucumber', link: 'https://cucumber.io/docs'},
      {name: 'TestContainers', link: 'https://www.testcontainers.org'},
      {name: 'Flyway', link: 'https://flywaydb.org/documentation/'},
    ],
    angularExample: "Tester les workflows complets d’une SPA Angular.",
    springExample: "Scénarios système pour APIs et DB via Cucumber.",
  },
  {
    typeTest: "Test End-to-End (E2E)",
    description: "Simule un utilisateur effectuant des actions de bout en bout.",
    frontendTools: [
      {name: 'Cypress', link: 'https://docs.cypress.io'},
      {name: 'Selenium', link: 'https://www.selenium.dev/documentation/'},
      {name: 'Protractor', link: 'https://www.protractortest.org/'},
      {name: 'Cucumber', link: 'https://cucumber.io/docs'},
    ],
    backendTools: [
      {name: 'Selenium', link: 'https://www.selenium.dev/documentation/'},
      {name: 'Cucumber', link: 'https://cucumber.io/docs'},
      {name: 'TestContainers', link: 'https://www.testcontainers.org'},
      {name: 'Flyway', link: 'https://flywaydb.org/documentation/'},
    ],
    angularExample: "Scénarios complets automatisés pour l’interface Angular.",
    springExample: "Tester les intégrations Rest avec le backend et DB dans Spring.",
  },
  {
    typeTest: "Test de Régression",
    description: "Vérifie que les nouvelles modifications ne cassent rien.",
    frontendTools: [
      {name: 'Jest', link: 'https://jestjs.io'},
      {name: 'Selenium', link: 'https://www.selenium.dev/documentation/'},
      {name: 'Cucumber', link: 'https://cucumber.io/docs'},
    ],
    backendTools: [
      {name: 'Cucumber', link: 'https://cucumber.io/docs'},
      {name: 'JUnit', link: 'https://junit.org/junit5/docs/current/user-guide/'},
      {name: 'TestContainers', link: 'https://www.testcontainers.org'},
      {name: 'Flyway', link: 'https://flywaydb.org/documentation/'},
    ],
    angularExample: "Exécuter les tests automatisés après chaque déploiement.",
    springExample: "Valider des APIs Rest existantes après migrations ou correctifs.",
  },
  {
    typeTest: "Test de Performance",
    description: "Évalue la vitesse et la stabilité de l’application sous charge.",
    frontendTools: [
      {name: 'Lighthouse', link: 'https://developer.chrome.com/docs/lighthouse/'},
    ],
    backendTools: [
      {name: 'Apache JMeter', link: 'https://jmeter.apache.org/usermanual/index.html'},
    ],
    angularExample: "Valider le chargement rapide des composants Angular (Lighthouse).",
    springExample: "Mesurer la charge (latence des API) avec JMeter.",
  },
];
}
