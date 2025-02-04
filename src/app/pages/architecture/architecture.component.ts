import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-architecture',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatCard,
    MatCardTitle,
    MatList,
    MatListItem
  ],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.css'
})
export class ArchitectureComponent {

}
