import {Component} from '@angular/core';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-front-veille',
  imports: [
    NgForOf
  ],
  templateUrl: './front-veille.component.html',
  styleUrl: './front-veille.component.css'
})
export class FrontVeilleComponent {
  sitesVeille: LinkInfo[] = [
    {
      name: 'Angular Officiel',
      link: 'https://angular.io',
      title: 'Documentation officielle d’Angular'
    },
    {
      name: 'Angular Blog',
      link: 'https://blog.angular.io',
      title: 'Blog officiel avec les nouveautés et annonces Angular'
    },
    {
      name: 'NGConf Medium',
      link: 'https://medium.com/ngconf',
      title: 'Articles pratiques publiés par NGConf'
    },
    {
      name: 'Dev.to #Angular',
      link: 'https://dev.to/t/angular',
      title: 'Communauté de développeurs partageant des tutoriels Angular'
    },
    {
      name: 'Reddit Angular',
      link: 'https://www.reddit.com/r/Angular2/',
      title: 'Forum pour échanger sur Angular, poser des questions ou partager des ressources'
    },
    {
      name: 'Angular GitHub',
      link: 'https://github.com/angular/angular',
      title: 'Dépôt officiel d’Angular avec suivi des issues et PRs'
    },
    {
      name: 'Angular University',
      link: 'https://angular-university.io/',
      title: 'Cours sur Angular pour approfondir vos compétences'
    },
    {
      name: 'RxJS (Observable Library)',
      link: 'https://rxjs.dev/',
      title: 'Documentation officielle de RxJS, bibliothèque clé pour Angular'
    },
  ];
}
