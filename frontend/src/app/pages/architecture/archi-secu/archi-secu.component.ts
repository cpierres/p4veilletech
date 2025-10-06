import { Component } from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-archi-secu',
    imports: [
        MatAccordion,
        MatCard,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
    ],
  templateUrl: './archi-secu.component.html',
  styleUrl: './archi-secu.component.css'
})
export class ArchiSecuComponent {

}
