import { Component } from '@angular/core';
import {ClassementComponent} from '../../../component/classement/classement.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-paradigms',
  imports: [
    ClassementComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
  ],
  templateUrl: './paradigms.component.html',
  styleUrl: './paradigms.component.css'
})
export class ParadigmsComponent {

}
