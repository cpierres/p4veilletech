import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {UiLibrariesComponent} from './ui-libraries/ui-libraries.component';
import {TestingLibrariesComponent} from './testing-libraries/testing-libraries.component';
import {ParadigmsComponent} from './paradigms/paradigms.component';
import {RssFrontComponent} from './rss-front/rss-front.component';

@Component({
  selector: 'app-front',
  imports: [
    MatTab,
    MatTabGroup,
    UiLibrariesComponent,
    TestingLibrariesComponent,
    ParadigmsComponent,
    RssFrontComponent
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {

}
