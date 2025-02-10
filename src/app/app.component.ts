import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, MatNavList, MatIcon, MatListItem, RouterLink, RouterLinkActive, MatIconButton, MatTooltip],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  profileImage: string = '/assets/img/cpierres-photo.png';

  // Méthode appelée au clic pour alterner entre les images
  toggleImage(): void {
    this.profileImage = this.profileImage === '/assets/img/cpierres-photo.png'
      ? '/assets/img/cpierres-avatar.png'
      : '/assets/img/cpierres-photo.png';
  }
}

