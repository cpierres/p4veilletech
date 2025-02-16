import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {LinkInfo} from '../../../core/models/LinkInfo';
import {LinksInfoService} from '../../../core/services/links-info/links-info.service';
import {LinkInfoComponent} from '../../../component/link-info/link-info.component';

@Component({
  selector: 'app-archi-veille',
  imports: [
    MatCard,
    LinkInfoComponent
  ],
  templateUrl: './archi-veille.component.html',
  styleUrl: './archi-veille.component.css'
})
export class ArchiVeilleComponent {
  sitesDockerKubernetesTitle = 'Mise en oeuvre de Kubernetes';
  sitesDockerKubernetes: LinkInfo[] = [];
  sitesMicroServicesTitle = 'Architecture Microservices';
  sitesMicroServices: LinkInfo[] = [];
  sitesEventDrivenTitle = 'Architecture Event Driven';
  sitesEventDriven: LinkInfo[] = [];

  constructor(
    private linksInfoService: LinksInfoService) {
  }

  ngOnInit(): void {
    this.sitesDockerKubernetes = this.linksInfoService.getSitesDockerKubernetes();
    this.sitesMicroServices = this.linksInfoService.getSitesMicroServices();
    this.sitesEventDriven = this.linksInfoService.getSitesEventDriven();

  }
}
