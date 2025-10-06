import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {BackVeilleComponent} from '../back/back-veille/back-veille.component';
import {FrontVeilleComponent} from '../front/front-veille/front-veille.component';
import {ClassementComponent} from '../../component/classement/classement.component';
import {MatDivider} from '@angular/material/divider';
import {MatCard} from '@angular/material/card';
import {ArchiVeilleComponent} from '../architecture/archi-veille/archi-veille.component';
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatTab,
    MatTabGroup,
    BackVeilleComponent,
    FrontVeilleComponent,
    ClassementComponent,
    MatDivider,
    MatCard,
    ArchiVeilleComponent,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatAccordion,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
