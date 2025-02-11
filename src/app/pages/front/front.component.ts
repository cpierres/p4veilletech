import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {UiLibrariesComponent} from './ui-libraries/ui-libraries.component';
import {TestingLibrariesComponent} from './testing-libraries/testing-libraries.component';
import {RssFrontComponent} from './rss-front/rss-front.component';
import {FrontVeilleComponent} from './front-veille/front-veille.component';

@Component({
  selector: 'app-front',
  imports: [
    MatTab,
    MatTabGroup,
    UiLibrariesComponent,
    TestingLibrariesComponent,
    RssFrontComponent,
    FrontVeilleComponent
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {

}
