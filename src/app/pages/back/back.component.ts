import { Component } from '@angular/core';
import {MatTable} from '@angular/material/table';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-back',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {

}
