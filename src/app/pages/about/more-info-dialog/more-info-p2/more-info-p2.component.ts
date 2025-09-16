import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-more-info-p2',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="project-details">
      <div class="section">
        <h3><mat-icon>web</mat-icon> Frontend Angular avec Graphiques</h3>
        <p>
          Développement d'une application frontend respectant des maquettes responsive strictes :
        </p>
        <ul>
          <li><strong>Angular 18 :</strong> Migration depuis version antérieure avec ngModules</li>
          <li><strong>Chart.js :</strong> Librairie de graphiques intégrée après analyse comparative</li>
          <li><strong>Responsive Design :</strong> Support mobile et desktop selon maquettes</li>
          <li><strong>RxJS :</strong> Programmation réactive pour la gestion des données</li>
        </ul>
        <!-- TODO: Ajouter plus de détails -->
      </div>

      <div class="section">
        <h3><mat-icon>architecture</mat-icon> Architecture & Bonnes Pratiques</h3>
        <p>
          Structure du projet pensée pour l'évolutivité :
        </p>
        <ul>
          <li><strong>Composants modulaires :</strong> Séparation des responsabilités</li>
          <li><strong>Services dédiés :</strong> Gestion centralisée des données</li>
          <li><strong>Compodoc :</strong> Documentation technique automatisée</li>
          <li><strong>Fonctionnalités cachées :</strong> Extensibilité démontrée</li>
        </ul>
        <!-- TODO: Compléter avec vos détails -->
      </div>
    </div>
    <div class="section">
      <h3><mat-icon>info</mat-icon> Informations diverses</h3>
      <p>
        Ce projet est un frontend (avec un backend existant minimaliste) devant respecter scrupuleusement des maquettes d'écran
        responsive (mobile et desktop) que voici :
        <a
          href="https://course.oc-static.com/projects/D%C3%A9v_Full-Stack/D%C3%A9veloppez+le+front-end+en+utilisant+Angular/P2_Wireframes.pdf"
          target="_blank">maquettes</a>
      </p>
      <p>
        Il fallait avoir une démarche de choix et d'intégration d'une librairie de gestion de graphes.<br>
      </p>
      <p>
        Le dépôt git, son README, ainsi que la compodoc permettent d'apprécier les bonnes pratiques appliquées.
      <p>
        Il s'agissait d'utiliser Angular en partant d'un starter code avec des paradigmes "anciens" (ngModules) mais
        avec une version d'Angular migrée en v18.<br>
        Cela m'a permis de me mettre dans le moule d'une organisation de développement habituelle/classique que l'on
        trouve encore beaucoup dans les développements du marché, tout en goûtant aux apports de la nouvelle version
        (standalone components).<br>
        Angular m'a rapidement démontré sa capacité à bien gérer l'asynchronisme et la programmation réactive avec
        RxJS.<br>
        Je suis allé plus loin que ce qui était demandé pour ce projet, car mon objectif n'était pas simplement de
        terminer un projet "fonctionnel",
        mais de mettre en oeuvre les meilleures pratiques et de structurer le projet de telle manière qu'il soit
        <u>facilement évolutif</u>.<br>
        Je me suis permis d'intégrer des fonctions "cachées" (non demandées dans les spécifications) pour démontrer
        l'évolutivité potentielle permise par mon design :<br>
        composants qui s'adaptent en cas d'ajout de séries, changement de types de graphes (double clic sur page
        principal).
      </p>
      <p>
        D'autres fonctionnalités cachées nécessitent la modif du code car on n'avait pas le droit sur ce projet de
        s'éloigner de la maquette pour la démo de soutenance ! (critère d'évaluation)
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
export class MoreInfoP2Component {}
