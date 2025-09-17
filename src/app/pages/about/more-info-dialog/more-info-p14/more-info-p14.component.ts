import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-more-info-p14',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="project-details">
      <div class="section">
        <h3><mat-icon>school</mat-icon> Formation OpenClassrooms - Parcours Complet</h3>
        <p>
          Ci-dessous l'image récapitulative des 13 projets validés dans le cadre de la formation OpenClassrooms :
        </p>

        <div class="image-container">
          <img src="/assets/img/Opencr-projets-valides.jpg"
               alt="Capture d'écran montrant les 13 projets OpenClassrooms validés"
               class="validation-image">
        </div>

        <!-- Commentaire sur le déroulement de la formation -->
        <div class="formation-timeline">
          <h4><mat-icon>schedule</mat-icon> Déroulement de la Formation</h4>
          <p class="timeline-comment">
            <strong>Note :</strong> Cette formation OpenClassrooms s'est déroulée en 2 temps :
          </p>
          <ul class="timeline-periods">
            <li><strong>1ère période :</strong> Du 1er décembre 2024 à fin mai 2025</li>
            <li><strong>2ème période :</strong> Du 1er juillet à fin août 2025</li>
          </ul>
          <p class="timeline-note">
            Cette organisation en deux phases a permis une progression technique optimale avec une pause
            pour consolider les acquis et une reprise pour finaliser les projets avancés de management
            et d'architecture.
          </p>
        </div>
      </div>

      <div class="section">
        <h3><mat-icon>verified</mat-icon> Certification Obtenue</h3>
        <p>
          Certification de <strong>Développeur Full-Stack - Java et Angular</strong> :
        </p>
        <ul>
          <li><strong>Niveau :</strong> 7 (équivalent BAC+5)</li>
          <li><strong>Code RNCP :</strong> 36912</li>
          <li><strong>Organisme :</strong> OpenClassrooms</li>
          <li><strong>Validation :</strong> 13 projets soutenus avec succès</li>
          <li><strong>Taux de réussite :</strong> 100% des projets validés</li>
        </ul>
      </div>

      <div class="section">
        <h3><mat-icon>trending_up</mat-icon> Expertise Technique Démontrée</h3>
        <p>
          Points forts mis en évidence durant ce parcours :
        </p>
        <ul>
          <li><strong>Innovation Technique :</strong> Premier étudiant à maîtriser l'architecture réactive full-stack (WebFlux + R2DBC)</li>
          <li><strong>Approche Professionnelle :</strong> Déploiements Docker, CI/CD avec GitHub Actions, métriques SonarQube</li>
          <li><strong>Dépassement des Requis :</strong> Projets enrichis avec fonctionnalités avancées et bonnes pratiques</li>
          <li><strong>Polyvalence :</strong> Compétences techniques ET managériales démontrées</li>
        </ul>
      </div>

      <div class="section">
        <h3><mat-icon>public</mat-icon> Portfolio Technique</h3>
        <p>
          Valeur ajoutée professionnelle de ce parcours :
        </p>
        <ul>
          <li><strong>Projets Consultables :</strong> Applications déployées et accessibles aux directions techniques</li>
          <li><strong>Code Source Ouvert :</strong> Repositories GitHub démontrant les compétences techniques</li>
          <li><strong>Documentation Complète :</strong> Architectures, choix techniques et bonnes pratiques documentés</li>
          <li><strong>Évolution Continue :</strong> Plateforme de veille technique évolutive (ce site Angular)</li>
        </ul>
      </div>

      <div class="section">
        <h3><mat-icon>lightbulb</mat-icon> Perspectives d'Évolution</h3>
        <p>
          Cette formation constitue une base solide pour :
        </p>
        <ul>
          <li><strong>Architectures Cloud-Native :</strong> Microservices, conteneurisation, orchestration</li>
          <li><strong>Technologies Émergentes :</strong> Intelligence artificielle, IoT, blockchain</li>
          <li><strong>Leadership Technique :</strong> Encadrement d'équipes sur les technologies modernes</li>
          <li><strong>Innovation Continue :</strong> Veille technologique et adoption de nouvelles pratiques</li>
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

    .section h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--primary-color);
      margin: 0 0 16px 0;
      font-size: 1.1em;
    }

    .section h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-color);
      margin: 20px 0 12px 0;
      font-size: 1em;
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

    .image-container {
      text-align: center;
      margin: 20px 0;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .validation-image {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .formation-timeline {
      background: #f0f4ff;
      padding: 16px;
      border-radius: 6px;
      margin: 16px 0;
      border-left: 3px solid var(--primary-color);
    }

    .timeline-comment {
      color: #333;
      font-style: italic;
      margin-bottom: 12px;
    }

    .timeline-periods {
      background: white;
      padding: 12px 16px;
      border-radius: 4px;
      margin: 8px 0;
      border: 1px solid #ddd;
    }

    .timeline-periods li {
      color: #2c3e50;
      font-weight: 500;
    }

    .timeline-note {
      font-size: 0.9em;
      color: #666;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #ddd;
    }
  `]
})
export class MoreInfoP14Component {}
