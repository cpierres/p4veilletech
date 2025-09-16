import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-more-info-p10',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="project-details">
      <div class="section">
        <h3><mat-icon>build_circle</mat-icon> Pipeline CI/CD Complet</h3>
        <p>
          Mise en place d'un pipeline DevOps moderne avec automatisation complète :
        </p>
        <ul>
          <li><strong>GitHub Actions :</strong> Workflows automatisés pour build, test, analyse et déploiement</li>
          <li><strong>Multi-environnements :</strong> Gestion des profils development, staging, production</li>
          <li><strong>Déclencheurs :</strong> Push, Pull Request, Release avec conditions intelligentes</li>
          <li><strong>Parallélisation :</strong> Jobs concurrents pour optimiser les temps de build</li>
        </ul>
        <!-- TODO: Ajouter détails sur les workflows -->
      </div>

      <div class="section">
        <h3><mat-icon>analytics</mat-icon> Analyse Qualité SonarQube</h3>
        <p>
          Intégration complète de SonarQube Cloud pour la qualité de code :
        </p>
        <ul>
          <li><strong>Métriques Qualité :</strong> Coverage, Duplications, Maintainability Index</li>
          <li><strong>Sécurité :</strong> Détection automatique des vulnérabilités et hotspots</li>
          <li><strong>Quality Gates :</strong> Seuils configurables bloquant les déploiements défaillants</li>
          <li><strong>Debt Technique :</strong> Évaluation et suivi de la dette technique</li>
        </ul>
        <!-- TODO: Détailler les métriques obtenues -->
      </div>

      <div class="section">
        <h3><mat-icon>inventory_2</mat-icon> Containerisation & Registry</h3>
        <p>
          Stratégie Docker complète avec optimisations avancées :
        </p>
        <ul>
          <li><strong>Multi-stage Builds :</strong> Optimisation de la taille des images finales</li>
          <li><strong>Multi-platform :</strong> Support AMD64 et ARM64 pour compatibilité maximale</li>
          <li><strong>Versioning :</strong> Tags automatiques basés sur Git (latest, develop, vX.Y.Z)</li>
          <li><strong>Security Scanning :</strong> Analyse des vulnérabilités des images Docker</li>
        </ul>
        <!-- TODO: Ajouter détails sur les optimisations -->
      </div>

      <div class="section">
        <h3><mat-icon>speed</mat-icon> Optimisations & Performance</h3>
        <p>
          Techniques appliquées pour optimiser le pipeline :
        </p>
        <ul>
          <li><strong>Cache Strategy :</strong> Cache Maven/Node pour réduire les temps de build</li>
          <li><strong>Matrix Builds :</strong> Tests parallèles sur différentes configurations</li>
          <li><strong>Conditional Jobs :</strong> Exécution intelligente selon les changements</li>
          <li><strong>Build Artifacts :</strong> Réutilisation des artefacts entre jobs</li>
        </ul>
        <!-- TODO: Ajouter métriques de performance -->
      </div>

      <div class="section">
        <h3><mat-icon>security</mat-icon> Sécurité & Bonnes Pratiques</h3>
        <p>
          Mesures de sécurité intégrées au pipeline :
        </p>
        <ul>
          <li><strong>Secrets Management :</strong> Gestion sécurisée des clés et tokens</li>
          <li><strong>OWASP Scanning :</strong> Analyse des dépendances pour vulnérabilités connues</li>
          <li><strong>Image Hardening :</strong> Images minimales et sécurisées</li>
          <li><strong>Access Control :</strong> Permissions granulaires sur les workflows</li>
        </ul>
        <!-- TODO: Détailler les mesures de sécurité -->
      </div>

      <div class="section">
        <h3><mat-icon>monitoring</mat-icon> Monitoring & Observabilité</h3>
        <p>
          Surveillance et métriques du pipeline :
        </p>
        <ul>
          <li><strong>Build Metrics :</strong> Temps d'exécution, taux de succès, tendances</li>
          <li><strong>Notifications :</strong> Alertes automatiques sur échecs ou problèmes qualité</li>
          <li><strong>Dashboards :</strong> Visualisation des métriques SonarQube et GitHub</li>
          <li><strong>Historique :</strong> Traçabilité complète des déploiements</li>
        </ul>
        <!-- TODO: Ajouter captures d'écran des métriques -->
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
export class MoreInfoP10Component {}
