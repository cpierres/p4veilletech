import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {BackPresentationComponent} from './back-presentation/back-presentation.component';
import {BackTestingFwkComponent} from './back-testing-fwk/back-testing-fwk.component';
import {BackParadigmsComponent} from './back-paradigms/back-paradigms.component';
import {RssBackComponent} from './rss-back/rss-back.component';
import {BackVeilleComponent} from './back-veille/back-veille.component';
import {BackPersistenceComponent} from './back-persistence/back-persistence.component';

@Component({
  selector: 'app-back',
  imports: [
    MatTab,
    MatTabGroup,
    BackPresentationComponent,
    BackTestingFwkComponent,
    BackParadigmsComponent,
    RssBackComponent,
    BackVeilleComponent,
    BackPersistenceComponent
  ],
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {

}
