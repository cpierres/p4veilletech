import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TypologieTestsComponent} from '../test-overview/typologie-tests/typologie-tests.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {BackVeilleComponent} from '../back/back-veille/back-veille.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatTab,
    MatTabGroup,
    BackVeilleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
