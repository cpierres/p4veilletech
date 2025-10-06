import {Component, OnInit} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {ClassementComponent} from '../../../component/classement/classement.component';
import {MatCard} from '@angular/material/card';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {LinkInfoComponent} from '../../../component/link-info/link-info.component';
import {LinksInfoService} from '../../../core/services/links-info/links-info.service';

@Component({
  selector: 'app-availability',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    ClassementComponent,
    MatCard,
    LinkInfoComponent
  ],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent implements OnInit {
  sitesDockerKubernetes: LinkInfo[] = [];

  constructor(
    private linksInfoService: LinksInfoService) {
  }

  ngOnInit(): void {
    this.sitesDockerKubernetes = this.linksInfoService.getSitesDockerKubernetes();
  }

}
