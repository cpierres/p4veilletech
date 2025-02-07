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
    MatRow
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
      frontendTools: 'Jasmine, Jest',
      backendTools: 'JUnit ( + Spring Test)',
      angularExample: 'Tester une méthode de service ou composant avec Jasmine.',
      springExample: 'Tester les méthodes d’un service avec JUnit dans Spring.',
    },
    {
      typeTest: "Test d'Intégration",
      description: "Valide que les différentes parties communiquent correctement.",
      frontendTools: "Jest",
      backendTools: "Postman, JUnit + Spring Test, Cucumber, TestContainers, Flyway",
      angularExample: "Tester l'interaction entre un service Angular et une API.",
      springExample: "Tester un contrôleur avec des services Spring, JUnit, Cucumber.",
    },
    {
      typeTest: "Test Fonctionnel",
      description: "Valide les fonctionnalités selon les besoins métier.",
      frontendTools: "Cypress, Cucumber, Playwright",
      backendTools: "Cucumber + Gherkin, TestContainers, Flyway",
      angularExample: "Tester des formulaires avec Cypress ou Gherkin (BDD).",
      springExample: "Tester des flux utilisateurs backend écrits en Gherkin.",
    },
    {
      typeTest: "Test de Système",
      description: "Vérifie tout le système ou logiciel.",
      frontendTools: "Selenium, TestCafe",
      backendTools: "Selenium, Cucumber, TestContainers, Flyway",
      angularExample: "Tester les workflows complets d’une SPA Angular.",
      springExample: "Scénarios système pour APIs et DB via Cucumber.",
    },
    {
      typeTest: "Test End-to-End (E2E)",
      description: "Simule un utilisateur effectuant des actions de bout en bout.",
      frontendTools: "Cypress, Selenium, Protractor, Cucumber",
      backendTools: "Selenium, Cucumber, TestContainers, Flyway",
      angularExample: "Scénarios complets automatisés pour l’interface Angular.",
      springExample: "Tester les intégrations Rest avec le backend et DB dans Spring.",
    },
    {
      typeTest: "Test de Régression",
      description: "Vérifie que les nouvelles modifications ne cassent rien.",
      frontendTools: "Jest, Selenium, Cucumber",
      backendTools: "Cucumber, JUnit, TestContainers, Flyway",
      angularExample: "Exécuter les tests automatisés après chaque déploiement.",
      springExample: "Valider des APIs Rest existantes après migrations ou correctifs.",
    },
    {
      typeTest: "Test de Performance",
      description: "Évalue la vitesse et la stabilité de l’application sous charge.",
      frontendTools: "Lighthouse",
      backendTools: "Apache JMeter",
      angularExample: "Valider le chargement rapide des composants Angular (Lighthouse).",
      springExample: "Mesurer la charge (latence des API) avec JMeter.",
    },
  ];
}
