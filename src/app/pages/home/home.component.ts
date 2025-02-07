import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TypologieTestsComponent} from '../test-overview/typologie-tests/typologie-tests.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
