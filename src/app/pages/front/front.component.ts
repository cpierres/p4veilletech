import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {UiLibrariesComponent} from './ui-libraries/ui-libraries.component';
import {TestingLibrariesComponent} from './testing-libraries/testing-libraries.component';
import {ParadigmsComponent} from './paradigms/paradigms.component';

@Component({
  selector: 'app-front',
  imports: [
    MatTab,
    MatTabGroup,
    UiLibrariesComponent,
    TestingLibrariesComponent,
    ParadigmsComponent
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {

}
