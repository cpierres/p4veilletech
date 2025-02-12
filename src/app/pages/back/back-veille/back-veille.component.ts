import { Component } from '@angular/core';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {NgForOf} from '@angular/common';
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-back-veille',
    imports: [
        NgForOf,
        MatCard
    ],
  templateUrl: './back-veille.component.html',
  styleUrl: './back-veille.component.css'
})
export class BackVeilleComponent {
   sitesVeille: LinkInfo[] = [
    {name: 'Spring Official', link: 'https://spring.io/',title: 'spring.io'},
    {name: 'Reddit (flux cpierresspring)', link: 'https://www.reddit.com/user/feisty-bluebird3824/m/cpierresspring/',title: 'reddit.com/user/feisty-bluebird3824/m/cpierresspring/'},
    {name: 'Baeldung', link: 'https://www.baeldung.com/',title: 'baeldung.com - tutoriaux gratuits et formations payantes'},
    {name: 'Blog de John Thompson', link: 'https://springframework.guru/blog/',title: 'springframework.guru/blog'},
    {name: 'Stackoverflow', link: 'https://stackoverflow.com/tags/spring/info',title: 'stackoverflow.com/tags/spring/info'},
    {name: 'StackShare', link: 'https://stackshare.io/spring-boot',title: 'stackshare.io/spring-boot'},
  ];
}
