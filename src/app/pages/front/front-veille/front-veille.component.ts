import {Component} from '@angular/core';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {NgForOf} from '@angular/common';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-front-veille',
  imports: [
    NgForOf,
    MatCard
  ],
  templateUrl: './front-veille.component.html',
  styleUrl: './front-veille.component.css'
})
export class FrontVeilleComponent {
  sitesVeilleAngular: LinkInfo[] = [
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
    {
      name: 'Expert Angular : Alain Chautard',
      link: 'https://www.angulartraining.com',
      title: 'Expertise Angular'
    },
    {
      name: 'Expert Angular : Manfred Steyer',
      link: 'https://www.angulararchitects.io/en/',
      title: 'Expertise Angular'
    },
    {
      name: 'Expert Angular : Joshua Morony',
      link: 'https://modernangular.com/',
      title: 'Expertise Angular'
    },
    {
      name: 'Expert Angular : Joshua Morony (inscription Newsletter)',
      link: 'https://mobirony.kit.com/4a331b9076',
      title: 'Expertise Angular'
    },
    {
      name: 'Expert Angular : Simon Dieny - youtube',
      link: 'https://www.youtube.com/watch?v=1TYrTW7K5is',
      title: 'Expertise Angular'
    },
  ];
}
