import { Component } from '@angular/core';
import { RssfeedComponent } from '../../../component/rssfeed/rssfeed.component';

@Component({
  selector: 'app-rss-front',
  imports: [RssfeedComponent], // Inclure votre composant RSS réutilisable ici
  templateUrl: './rss-front.component.html',
  styleUrl: './rss-front.component.css',
  standalone: true
})
export class RssFrontComponent {}
