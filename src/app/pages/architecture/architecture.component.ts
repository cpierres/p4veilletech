import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {AvailabilityComponent} from './availability/availability.component';
import {ArchiPourContreComponent} from './archi-pour-contre/archi-pour-contre.component';
import {ParadigmsComponent} from './paradigms/paradigms.component';
import {ArchiVeilleComponent} from './archi-veille/archi-veille.component';
import {ArchiSecuComponent} from './archi-secu/archi-secu.component';

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
    MatListItem,
    MatTabGroup,
    MatTab,
    AvailabilityComponent,
    ArchiPourContreComponent,
    ParadigmsComponent,
    ArchiVeilleComponent,
    ArchiSecuComponent
  ],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.css'
})
export class ArchitectureComponent {

}
