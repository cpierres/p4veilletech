import { Component } from '@angular/core';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-back-veille',
  imports: [
    NgForOf
  ],
  templateUrl: './back-veille.component.html',
  styleUrl: './back-veille.component.css'
})
export class BackVeilleComponent {
   sitesVeille: LinkInfo[] = [
    {name: 'Spring Official', link: 'https://spring.io/'},
    {name: 'Reddit (flux cpierresspring)', link: 'https://www.reddit.com/user/feisty-bluebird3824/m/cpierresspring/'},
    {name: 'Baeldung', link: 'https://www.baeldung.com/'},
    {name: 'Dzone (Spring)', link: 'https://dzone.com/spring'},
    {name: 'Java Code Geeks - Spring', link: 'https://www.javacodegeeks.com/'},
    {name: 'Blog de John Thompson', link: 'https://springframework.guru/blog/'},
    {name: 'Stackoverflow', link: 'https://stackoverflow.com/tags/spring/info'},
  ];
}
