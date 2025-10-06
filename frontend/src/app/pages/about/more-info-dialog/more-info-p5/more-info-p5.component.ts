import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-more-info-p5',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="project-details">
      <div class="section">
        <h3><mat-icon>verified</mat-icon> Stratégie de Tests Complète</h3>
        <p>
          Mise en œuvre d'une approche de tests exhaustive sur une application full-stack existante :
        </p>
        <ul>
          <li><strong>Tests Unitaires :</strong> Isolation des composants avec mocking avancé des dépendances</li>
          <li><strong>Tests d'Intégration :</strong> Validation des interactions entre couches applicatives</li>
          <li><strong>Tests End-to-End :</strong> Scénarios utilisateur complets avec Cypress</li>
          <li><strong>Couverture de Code :</strong> Objectif >80% atteint sur backend et frontend</li>
        </ul>
        <!-- TODO: Ajouter plus de détails sur les stratégies -->
      </div>

      <div class="section">
        <h3><mat-icon>build</mat-icon> Technologies & Outils de Test</h3>
        <p>
          Stack complète d'outils de tests modernes :
        </p>
        <ul>
          <li><strong>Frontend :</strong> Jasmine, Karma, Jest pour les tests unitaires Angular</li>
          <li><strong>Backend :</strong> JUnit 5, Mockito, Spring Test pour les tests Spring Boot</li>
          <li><strong>End-to-End :</strong> Cypress pour les tests d'interface utilisateur</li>
          <li><strong>Rapports :</strong> Coverage reports intégrés avec métriques détaillées</li>
        </ul>
        <!-- TODO: Détailler les configurations -->
      </div>

      <div class="section">
        <h3><mat-icon>psychology</mat-icon> Méthodologies Appliquées</h3>
        <p>
          Approches et bonnes pratiques de test :
        </p>
        <ul>
          <li><strong>Test-Driven Development (TDD) :</strong> Tests écrits avant le code</li>
          <li><strong>Behavior-Driven Development (BDD) :</strong> Tests basés sur le comportement métier</li>
          <li><strong>Mocking Strategies :</strong> Isolation efficace des dépendances externes</li>
          <li><strong>Test Pyramids :</strong> Équilibre optimal entre types de tests</li>
        </ul>
        <!-- TODO: Ajouter exemples concrets -->
      </div>

      <div class="section">
        <h3><mat-icon>insights</mat-icon> Apprentissages Clés</h3>
        <p>
          Retour d'expérience et découvertes importantes :
        </p>
        <ul>
          <li><strong>Intégration Native :</strong> Angular/Spring excellent support du testing</li>
          <li><strong>Développeur-Testeur :</strong> Meilleure compréhension métier = meilleurs tests</li>
          <li><strong>Tests Pédagogiques :</strong> Découverte approfondie du code existant</li>
          <li><strong>TDD Optimal :</strong> Tests conçus avec le code vs tests après coup</li>
        </ul>
        <!-- TODO: Approfondir les enseignements -->
      </div>
<div class="section">
  <h3><mat-icon>info</mat-icon> Informations diverses</h3>
  <p>
    Les technologies utilisées et rapports de couverture de tests sont présentés dans le <a
    href="https://github.com/cpierres/P5-Test-full-stack" target="_blank">README du dépôt github</a><br>
    Vous y trouverez bien sûr toutes les indications pour exécuter les tests.
  </p>
  <p>
    Les techniques de testing étaient un sujet que je connaissais déjà.<br>
    J'ai trouvé qu'Angular et Spring permettent une mise en oeuvre absolument <b>excellente</b> en intégrant
    les besoins de testing au coeur de leur architecture !<br>
    et ça change tout !
  <p>
  <p>
    L'objectif était le testing complet sur une application fullstack existante :</p>
  <ul>
    <li>tests unitaires</li>
    <li>tests d'intégration</li>
    <li>tests end-to-end avec Cypress</li>
  </ul>
  <p>
    avec un taux de couverture d'au moins 80% sur les deux couches.
  </p>
  <p>
    Accessoirement, le fait de devoir effectuer les tests sur cet existant m'a permis de découvrir en profondeur
    des techniques intéressantes côté backend et frontend.<br>
    J'ai trouvé la démarche intéressante au niveau pédagogique de la part d'OpenClassrooms.
  </p>
  <p>
    Je pense aussi qu'un développeur peut produire de bien meilleurs tests qu'une personne uniquement spécialisée
    sur les tests !<br>
    L'idéal étant de faire les tests au moment de la conception du programme en TDD (Test Driven Development)
    parce que les faire après le développement c'est un peu fastidieux !
  </p>
  <p>
    Lire le README. Les tests e2e sont prévus pour s'exécuter aussi bien sur des Mocks que sur une intégration DB avec H2.
  </p>
</div>

  `,
  styles: [`
    .project-details {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border-left: 4px solid var(--primary-color);
    }

    .section h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--primary-color);
      margin: 0 0 16px 0;
      font-size: 1.1em;
    }

    .section p {
      margin: 0 0 12px 0;
      line-height: 1.6;
      color: #555;
    }

    .section ul {
      margin: 12px 0 0 0;
      padding-left: 20px;
    }

    .section li {
      margin-bottom: 8px;
      line-height: 1.5;
    }

    .section li strong {
      color: var(--primary-color);
    }
  `]
})
export class MoreInfoP5Component {}
