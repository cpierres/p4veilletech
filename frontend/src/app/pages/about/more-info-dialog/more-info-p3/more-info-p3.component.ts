import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-more-info-p3',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="project-details">
    </div>
    <div class="section">
      <h3><mat-icon>info</mat-icon> Informations diverses</h3>
      <p>
        Le frontend existant se basait sur une simulation de l'API backend qui nous était fournie via l'outil Mockoon.<br>
        Le projet backend P3 consistait donc à implémenter l'API backend en utilisant SpringBoot et Spring Data
        JPA/MVC.<br>
        J'ai trouvé intéressant la facilité de mise en oeuvre et la productivité de Spring Data JPA/MVC mais j'ai aussi constaté qu'on
        restait dans les paradigmes bloquant de JEE.<br>
        J'ai bien apprécié la sécurité JWT et la vue globale des architectures de sécurité.<br>
        Bien entendu, toutes les bonnes pratiques et bons outils ont été employées : SOLID, lombok, mapstruct, doc, swagger, docker, etc...<br>
        J'ai aussi utilisé cloudinary pour les fichiers multi-média.
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
export class MoreInfoP3Component {}
