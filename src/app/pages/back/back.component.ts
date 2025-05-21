import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {BackPresentationComponent} from './back-presentation/back-presentation.component';
import {RssBackComponent} from './rss-back/rss-back.component';
import {BackVeilleComponent} from './back-veille/back-veille.component';
import {BackPersistenceComponent} from './back-persistence/back-persistence.component';
import {BackMicroservicesComponent} from './back-microservices/back-microservices.component';
import {BackSecurityComponent} from './back-security/back-security.component';

@Component({
  selector: 'app-back',
  imports: [
    MatTab,
    MatTabGroup,
    BackPresentationComponent,
    RssBackComponent,
    BackVeilleComponent,
    BackPersistenceComponent,
    BackMicroservicesComponent,
    BackSecurityComponent
  ],
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {

}
