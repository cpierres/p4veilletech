import { Component } from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ClassementComponent} from '../../../component/classement/classement.component';

@Component({
  selector: 'app-archi-pour-contre',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    ClassementComponent
  ],
  templateUrl: './archi-pour-contre.component.html',
  styleUrl: './archi-pour-contre.component.css'
})
export class ArchiPourContreComponent {

}
