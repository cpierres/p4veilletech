import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {FrontComponent} from './pages/front/front.component';
import {BackComponent} from './pages/back/back.component';
import {ArchitectureComponent} from './pages/architecture/architecture.component';
import {TestOverviewComponent} from './pages/test-overview/test-overview.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'front', component: FrontComponent},
  {path: 'back', component: BackComponent},
  {path: 'architecture', component: ArchitectureComponent},
  {path: 'test-overview', component: TestOverviewComponent}
];
