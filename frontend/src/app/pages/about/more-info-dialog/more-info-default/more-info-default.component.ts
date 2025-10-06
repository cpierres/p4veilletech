import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-more-info-default',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="project-details">
      <div class="section">
        <h3><mat-icon>info</mat-icon> Informations Détaillées - {{ projectTitle }}</h3>
        <p>
          Ce projet fait partie de la formation certifiante OpenClassrooms niveau 7 (BAC+5).
        </p>
        <p>
          <strong>Statut :</strong> Contenu détaillé en cours de rédaction.
        </p>
        <!-- TODO: Ajouter le contenu spécifique à chaque projet -->
      </div>

      <div class="section coming-soon">
        <h3><mat-icon>schedule</mat-icon> Contenu à venir</h3>
        <p>
          Les détails techniques complets de ce projet seront bientôt disponibles.
        </p>
        <ul>
          <li>Architecture technique détaillée</li>
          <li>Technologies utilisées</li>
          <li>Défis rencontrés et solutions</li>
          <li>Métriques de performance</li>
          <li>Bonnes pratiques appliquées</li>
        </ul>
      </div>
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

    .section.coming-soon {
      border-left-color: #FF9800;
      background: linear-gradient(135deg, #fff8e1 0%, #ffffff 100%);
    }

    .section.coming-soon h3 {
      color: #FF9800;
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

    .section strong {
      color: var(--primary-color);
    }
  `]
})
export class MoreInfoDefaultComponent {
  @Input() projectTitle: string = '';
  @Input() projectId: number = 0;
}
