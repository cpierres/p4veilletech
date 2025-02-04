import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FrontComponent } from './pages/front/front.component';
import { UiLibrariesComponent } from './pages/front/ui-libraries/ui-libraries.component';
import { BackComponent } from './pages/back/back.component';
import { ArchitectureComponent } from './pages/architecture/architecture.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'front', component: FrontComponent },
  { path: 'front/ui-libraries', component: UiLibrariesComponent },
  { path: 'back', component: BackComponent },
  { path: 'architecture', component: ArchitectureComponent },
];
