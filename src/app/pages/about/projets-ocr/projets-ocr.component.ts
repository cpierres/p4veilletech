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
  constructor(public dialog: MatDialog) {}

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
