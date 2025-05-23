import { Component } from '@angular/core';
import {ArchiVeilleComponent} from "../../architecture/archi-veille/archi-veille.component";
import {BackVeilleComponent} from "../../back/back-veille/back-veille.component";
import {ClassementComponent} from "../../../component/classement/classement.component";
import {FrontVeilleComponent} from "../../front/front-veille/front-veille.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCard} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {RouterLink} from "@angular/router";
import {ProjetsOcrComponent} from '../projets-ocr/projets-ocr.component';
import {UdemyComponent} from '../udemy/udemy.component';
import {TrainingComponent} from '../training/training.component';

@Component({
  selector: 'app-me',
  imports: [
    MatCard,
    MatTab,
    MatTabGroup,
    RouterLink,
    ProjetsOcrComponent,
    UdemyComponent,
    TrainingComponent
  ],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {

}
