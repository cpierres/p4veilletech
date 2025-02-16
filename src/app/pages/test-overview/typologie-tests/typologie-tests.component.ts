import {Component, OnInit} from '@angular/core';
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
import {NgForOf, NgIf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatCard} from '@angular/material/card';
import {ClassementComponent} from '../../../component/classement/classement.component';
import {LinksInfoService} from '../../../core/services/links-info/links-info.service';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {LinkInfoComponent} from '../../../component/link-info/link-info.component';

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
    NgForOf,
    MatDivider,
    MatCard,
    ClassementComponent,
    NgIf,
    LinkInfoComponent
  ],
  templateUrl: './typologie-tests.component.html',
  styleUrl: './typologie-tests.component.css',
  standalone: true,
})
export class TypologieTestsComponent implements OnInit {
  sitesBackTestTitle: string = 'Sites pour tests Backend';
  sitesFrontTestTitle: string = 'Sites pour tests Frontend';
  sitesBackTest: LinkInfo[] = [];
  sitesFrontTest: LinkInfo[] = [];

  constructor(private linksInfoService: LinksInfoService) {
  }

  ngOnInit(): void {
    this.sitesBackTest = this.linksInfoService.getSitesBackTest();
    this.sitesFrontTest = this.linksInfoService.getSitesFrontTest();
  }

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
        {name: 'Jest (avec TestBed)', link: 'https://jestjs.io', choice: '1'},
      ],
      backendTools: [
        {name: 'JUnit', link: 'https://junit.org/junit5/docs/current/user-guide/', choice: '1'},
        {name: 'Mockito', link: 'https://site.mockito.org', choice: '1'},
      ],
      angularExample: 'Tester une méthode de service ou composant avec Jasmine.',
      springExample: 'Tester les méthodes d’un service avec JUnit dans Spring.',
    },
    {
      typeTest: "Test d'Intégration",
      description: "Valide que les différentes parties communiquent correctement.",
      frontendTools: [
        {name: 'Jest (avec TestBed)', link: 'https://jestjs.io', choice: '1'},
        {name: 'Cypress', link: 'https://docs.cypress.io', choice: '1'},
        {name: 'Playwright', link: 'https://playwright.dev'},
        {name: 'Selenium', link: 'https://www.selenium.dev/documentation/'},
        {name: 'Cucumber/Gherkin', link: 'https://cucumber.io/docs'},
        {name: 'Protractor', link: 'https://www.protractortest.org/'},
      ],
      backendTools: [
        {name: 'Postman', link: 'https://www.postman.com'},
        {
          name: 'Spring Test, JUnit, Mockito, SpringMVC',
          link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html',
          choice: '1'
        },
        {name: 'Cucumber/Gherkin', link: 'https://cucumber.io/docs', choice: '1'},
        {name: 'TestContainers', link: 'https://www.testcontainers.org', choice: '1'},
        {name: 'Flyway', link: 'https://flywaydb.org/documentation/', choice: '1'},
      ],
      angularExample: "Tester l'interaction entre un service Angular et une API.",
      springExample: "Tester un contrôleur avec des services Spring, JUnit, Cucumber.",
    },
    {
      typeTest: "Test End-to-End (E2E) et Test Fonctionnel (back)",
      description: "Simule un utilisateur effectuant des actions de bout en bout.",
      frontendTools: [
        {name: 'Cypress', link: 'https://docs.cypress.io', choice: '1'},
        {name: 'Playwright', link: 'https://playwright.dev'},
        {name: 'Selenium', link: 'https://www.selenium.dev/documentation/'},
        {name: 'Cucumber/Gherkin', link: 'https://cucumber.io/docs'},
        {name: 'Protractor', link: 'https://www.protractortest.org/'},
      ],
      backendTools: [
        {name: 'Playwright', link: 'https://playwright.dev'},
        {
          name: 'Spring Test, JUnit, Mockito, SpringMVC',
          link: 'https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html',
          choice: '1'
        },
        {name: 'Cucumber/Gherkin', link: 'https://cucumber.io/docs', choice: '1'},
        {name: '(TestContainers)', link: 'https://www.testcontainers.org', choice: '1'},
        {name: '(Flyway)', link: 'https://flywaydb.org/documentation/', choice: '1'},
      ],
      angularExample: "Scénarios complets automatisés pour l’interface Angular.",
      springExample: "Tester les fonctionnalités métier des services Rest.",
    },
    {
      typeTest: "Test de Régression",
      description: "Vérifie que les nouvelles modifications ne cassent rien.",
      frontendTools: [
        {name: 'Mêmes outils que Tests d\'intégration et fonctionnel', link: '#'},
      ],
      backendTools: [
        {name: 'Mêmes outils que Tests d\'intégration et fonctionnel', link: '#'},
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
      angularExample: "Valider le chargement rapide des composants Angular.",
      springExample: "Mesurer la charge (latence des API) avec JMeter.",
    },
  ];
}
