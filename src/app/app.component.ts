import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, MatNavList, MatIcon, MatListItem, RouterLink, RouterLinkActive, MatIconButton, MatTooltip],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;

  private readonly profileImageDefault: string = 'assets/img/cpierres-photo.png';
  private readonly profileImageAvatar: string = 'assets/img/cpierres-avatar2.png';
  profileImage: string = this.profileImageDefault;
  private readonly tooltipMessageDefault: string = 'Sénior ? Clic pour voir';
  private readonly tooltipMessageAvatar: string = 'non... Dinosaure Reactorus ! (réactif de bout en bout)';
  tooltipMessage: string = this.tooltipMessageDefault;

  private destroy$ = new Subject<void>();
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Détection des appareils mobiles
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.isMobile = result.matches;

      // Sur mobile, fermer le menu par défaut
      if (this.isMobile && this.drawer) {
        this.drawer.close();
      }
      // Sur desktop, ouvrir le menu par défaut
      else if (!this.isMobile && this.drawer) {
        this.drawer.open();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  toggleMenu() {
    this.drawer.toggle();
  }
}

