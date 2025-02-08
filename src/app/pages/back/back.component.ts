import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {BackFwkComponent} from './back-fwk/back-fwk.component';
import {BackTestingFwkComponent} from './back-testing-fwk/back-testing-fwk.component';
import {BackParadigmsComponent} from './back-paradigms/back-paradigms.component';
import {RssBackComponent} from './rss-back/rss-back.component';
import {BackVeilleComponent} from './back-veille/back-veille.component';

@Component({
  selector: 'app-back',
  imports: [
    MatTab,
    MatTabGroup,
    BackFwkComponent,
    BackTestingFwkComponent,
    BackParadigmsComponent,
    RssBackComponent,
    BackVeilleComponent
  ],
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {

}
