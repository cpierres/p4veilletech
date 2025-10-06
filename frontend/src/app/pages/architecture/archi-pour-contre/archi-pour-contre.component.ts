import { Component } from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {ClassementComponent} from '../../../component/classement/classement.component';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-archi-pour-contre',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    ClassementComponent,
    MatCard
  ],
  templateUrl: './archi-pour-contre.component.html',
  styleUrl: './archi-pour-contre.component.css'
})
export class ArchiPourContreComponent {

}
