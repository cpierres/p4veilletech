import {Component, Input} from '@angular/core';
import {LinkInfo} from '../../core/models/LinkInfo';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-link-info',
  imports: [
    NgForOf
  ],
  templateUrl: './link-info.component.html',
  styleUrl: './link-info.component.css'
})
export class LinkInfoComponent {
  @Input() title: string = 'Sites de référence';
  @Input() links: LinkInfo[] = [];
}
