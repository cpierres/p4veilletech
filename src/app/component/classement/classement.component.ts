import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-classement',
  imports: [
    NgIf
  ],
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.css'
})
export class ClassementComponent {
  @Input()
  classement?: string;

}
