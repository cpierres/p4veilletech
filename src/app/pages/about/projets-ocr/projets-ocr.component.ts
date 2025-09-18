import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EvaluationDialogComponent } from '../evaluation-dialog/evaluation-dialog.component';
import { MoreInfoDialogComponent } from '../more-info-dialog/more-info-dialog.component';
import { CommonModule } from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-projets-ocr',
  imports: [
    CommonModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatDialogModule,
    MatButtonModule,
    MatIcon,
    MatExpansionPanelDescription
  ],
  templateUrl: './projets-ocr.component.html',
  styleUrl: './projets-ocr.component.css'
})
export class ProjetsOcrComponent {
  // Définir quels projets sont vos favoris (vous pouvez modifier cette liste selon vos préférences)
  favoriteProjects: number[] = [6]; // Projet 4 (Site Angular) et Projet 6 (Architecture réactive)

constructor(public dialog: MatDialog) {}

isFavorite(projectId: number): boolean {
  return this.favoriteProjects.includes(projectId);
}

  isFavoriteProject(projectId: number): boolean {
    return this.favoriteProjects.includes(projectId);
  }

  openEvaluationDialog(id: number): void {
    const dialogRef = this.dialog.open(EvaluationDialogComponent, {
      width: '80%',
      height: '90%',
      maxWidth: '80vw',
      minWidth: '80vw',
      data: { id }
    });
  }

  openMoreInfoDialog(projectId: number, projectTitle: string): void {
    const dialogRef = this.dialog.open(MoreInfoDialogComponent, {
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      data: {
        projectId: projectId,
        projectTitle: projectTitle
      }
    });
  }
}
