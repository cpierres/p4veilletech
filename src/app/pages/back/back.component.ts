import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {BackFwkComponent} from './back-fwk/back-fwk.component';
import {BackTestingFwkComponent} from './back-testing-fwk/back-testing-fwk.component';
import {BackParadigmsComponent} from './back-paradigms/back-paradigms.component';

@Component({
  selector: 'app-back',
  imports: [
    MatTab,
    MatTabGroup,
    BackFwkComponent,
    BackTestingFwkComponent,
    BackParadigmsComponent
  ],
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {

}
