import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-front',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {

}
