import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, MatNavList, MatIcon, MatListItem, RouterLink, RouterLinkActive, MatIconButton, MatTooltip],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly profileImageDefault: string = 'assets/img/cpierres-photo.png';
  private readonly profileImageAvatar: string = 'assets/img/cpierres-avatar2.png';
  profileImage: string = this.profileImageDefault;
  private readonly tooltipMessageDefault: string = 'Sénior ? Clic pour voir';
  private readonly tooltipMessageAvatar: string = 'non... Dinosaure Reactorus ! (réactif de bout en bout)';
  tooltipMessage: string = this.tooltipMessageDefault;

  toggleImage(): void {
    this.profileImage = this.profileImage === this.profileImageDefault
      ? this.profileImageAvatar
      : this.profileImageDefault;
    this.tooltipMessage = this.tooltipMessage === this.tooltipMessageDefault
      ? this.tooltipMessageAvatar
      : this.tooltipMessageDefault;
  }

  updateTooltipOnHover(): void {
    this.tooltipMessage =
      this.profileImage === this.profileImageDefault
        ? this.tooltipMessageDefault
        : this.tooltipMessageAvatar;
  }

  resetTooltip(): void {
    this.tooltipMessage =
      this.profileImage === this.profileImageDefault
        ? this.tooltipMessageDefault
        : this.tooltipMessageAvatar;
  }

}

