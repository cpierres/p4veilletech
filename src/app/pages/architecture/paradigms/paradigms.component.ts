import {Component, OnInit} from '@angular/core';
import {ClassementComponent} from '../../../component/classement/classement.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatCard, MatCardContent} from '@angular/material/card';
import {LinksInfoService} from '../../../core/services/links-info/links-info.service';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {LinkInfoComponent} from '../../../component/link-info/link-info.component';

@Component({
  selector: 'app-paradigms',
  imports: [
    ClassementComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatCard,
    MatCardContent,
    LinkInfoComponent,
    MatCardContent,
  ],
  templateUrl: './paradigms.component.html',
  styleUrl: './paradigms.component.css'
})
export class ParadigmsComponent implements OnInit {
  sitesPrgFonctionnelleEtReactiveBackTitle: string = 'Sites de référence pour la programmation fonctionnelle et réactive côté Back (java)';
  sitesPrgReactiveFrontTitle: string = 'Sites de référence pour la programmation fonctionnelle et réactive côté Front (Typescript)';
  sitesPrgFonctionnelleEtReactiveBack: LinkInfo[] = [];
  sitesPrgReactiveFront: LinkInfo[] = [];

  constructor(private linksInfoService: LinksInfoService) { }

    ngOnInit(): void {
        this.sitesPrgFonctionnelleEtReactiveBack = this.linksInfoService.getSitesPrgFonctionnelleEtReactiveBack();
        this.sitesPrgReactiveFront = this.linksInfoService.getSitesPrgReactiveFront()
    }

}
