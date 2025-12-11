import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-evaluation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Évaluation - Projet {{ data.id }}</h2>
    <div mat-dialog-content>
      <div class="carousel-container">
        <button mat-icon-button class="nav-button prev" (click)="prevImage()" *ngIf="currentIndex > 0">
          <mat-icon>chevron_left</mat-icon>
        </button>

        <div class="image-container">
          <img [src]="currentImage" alt="Évaluation" class="carousel-image">
          <div class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
        </div>

        <button mat-icon-button class="nav-button next" (click)="nextImage()" *ngIf="currentIndex < images.length - 1">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fermer</button>
    </div>
  `,
  styles: [`
    .mat-mdc-dialog-content {
      max-height: 80vh;
      width: 100%;
      box-sizing: border-box;
    }
    .carousel-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      box-sizing: border-box;
    }
    .image-container {
      position: relative;
      text-align: center;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .carousel-image {
      max-width: 100%;
      max-height: 75vh;
      height: auto;
      object-fit: contain;
    }
    .nav-button {
      position: absolute;
      z-index: 10;
    }
    .prev {
      left: 0;
    }
    .next {
      right: 0;
    }
    .image-counter {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
    }
  `]
})
export class EvaluationDialogComponent {
  // Mapping of project IDs to evaluation images
  private projectImages: { [key: number]: string[] } = {
    2: [
      '/assets/img/P2-evaluation-1.jpg',
      '/assets/img/P2-evaluation-2.jpg'
    ],
    3: [
      '/assets/img/P3-evaluation-1.jpg',
      '/assets/img/P3-evaluation-2.jpg'
    ],
    4: [
      '/assets/img/P4-evaluation-1.jpg',
      '/assets/img/P4-evaluation-2.jpg'
    ],
    5: [
      '/assets/img/P5-evaluation-1.jpg',
      '/assets/img/P5-evaluation-2.jpg'
    ],
    6: [
      '/assets/img/P6-evaluation-1.jpg',
      '/assets/img/P6-evaluation-2.jpg'
    ],
    7: [
      '/assets/img/P7-evaluation-1.jpg',
      '/assets/img/P7-evaluation-2.jpg',
      '/assets/img/P7-evaluation-3.jpg'
    ],
    8: [
      '/assets/img/P8-evaluation-CC-1.jpg',
      '/assets/img/P8-evaluation-CC-2.jpg',
      '/assets/img/P8-evaluation-CC-3.jpg',
      '/assets/img/P8-evaluation-CC-4.jpg'
    ],
    9: [
      '/assets/img/P9-evaluation-cadrer-1.jpg',
      '/assets/img/P9-evaluation-cadrer-2.jpg',
      '/assets/img/P9-evaluation-cadrer-3.jpg'
    ],
    10: [
      '/assets/img/P10-evaluation-cicd-1.jpg',
      '/assets/img/P10-evaluation-cicd-2.jpg',
      '/assets/img/P10-evaluation-cicd-3.jpg',
      '/assets/img/P10-evaluation-cicd-4.jpg'
    ],
    11: [
      '/assets/img/P11-evaluation-encadrer-1.jpg',
      '/assets/img/P11-evaluation-encadrer-2.jpg',
      '/assets/img/P11-evaluation-encadrer-3.jpg'
    ],
    12: [
      '/assets/img/P12-evaluation-planifier-securiser-1.jpg',
      '/assets/img/P12-evaluation-planifier-securiser-2.jpg',
      '/assets/img/P12-evaluation-planifier-securiser-3.jpg'
    ],
    13: [
      '/assets/img/P13-soutenance-architecture-1.jpg',
      '/assets/img/P13-soutenance-architecture-2.jpg',
      '/assets/img/P13-soutenance-architecture-3.jpg'
    ]
  };

  images: string[] = [];
  currentIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<EvaluationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.images = this.getImagesForProject(data.id);
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  getImagesForProject(id: number): string[] {
    return this.projectImages[id] || [];
  }
}
