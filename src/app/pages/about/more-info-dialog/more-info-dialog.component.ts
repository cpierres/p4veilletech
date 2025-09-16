import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MoreInfoP2Component } from './more-info-p2/more-info-p2.component';
import { MoreInfoP6Component } from './more-info-p6/more-info-p6.component';
import { MoreInfoDefaultComponent } from './more-info-default/more-info-default.component';
import {MoreInfoP3Component} from './more-info-p3/more-info-p3.component';
import {MoreInfoP5Component} from './more-info-p5/more-info-p5.component';
import {MoreInfoP10Component} from './more-info-p10/more-info-p10.component';

export interface MoreInfoDialogData {
  projectId: number;
  projectTitle: string;
}

@Component({
  selector: 'app-more-info-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MoreInfoP2Component,
    MoreInfoP6Component,
    MoreInfoP3Component,
    MoreInfoP5Component,
    MoreInfoP10Component,
    //MoreInfoDefaultComponent
  ],
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>
        <mat-icon>info</mat-icon>
        {{ data.projectTitle }} - Détails Techniques
      </h2>
      <button mat-icon-button (click)="close()" class="close-button">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <div mat-dialog-content class="dialog-content">
      <div class="content-container">
        <!-- Le contenu sera ajouté dynamiquement selon le projectId -->
        <div [ngSwitch]="data.projectId">

          <div *ngSwitchCase="2" class="project-details">
            <app-more-info-p2/>
          </div>
          <div *ngSwitchCase="3" class="project-details">
            <app-more-info-p3/>
          </div>
          <div *ngSwitchCase="5" class="project-details">
            <app-more-info-p5/>
          </div>
          <div *ngSwitchCase="6" class="project-details">
            <app-more-info-p6/>
          </div>
          <div *ngSwitchCase="10" class="project-details">
            <app-more-info-p10/>
          </div>
        </div>
      </div>
    </div>

    <div mat-dialog-actions class="dialog-actions">
      <button mat-raised-button color="primary" (click)="close()">
        <mat-icon>close</mat-icon>
        Fermer
      </button>
    </div>
  `,
  styles: [`
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #e0e0e0;
      background: linear-gradient(135deg, #f8f9ff 0%, #e8f4f8 100%);
    }

    .dialog-header h2 {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
      color: var(--primary-color);
      font-size: 1.3em;
    }

    .close-button {
      color: #666;
    }

    .dialog-content {
      max-height: 70vh;
      overflow-y: auto;
      padding: 0;
    }

    .content-container {
      padding: 24px;
    }

    /* Styles déplacés dans les sous-composants */

    .dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e0e0e0;
      background: #f8f9fa;
      justify-content: center;
    }

    .dialog-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Scrollbar personnalisée */
    .dialog-content::-webkit-scrollbar {
      width: 8px;
    }

    .dialog-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    .dialog-content::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }

    .dialog-content::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .dialog-header {
        padding: 12px 16px;
      }

      .dialog-header h2 {
        font-size: 1.1em;
      }

      .content-container {
        padding: 16px;
      }

      .section {
        padding: 16px;
      }
    }
  `]
})
export class MoreInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MoreInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MoreInfoDialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
