import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {FrontComponent} from './pages/front/front.component';
import {UiLibrariesComponent} from './pages/front/ui-libraries/ui-libraries.component';
import {BackComponent} from './pages/back/back.component';
import {ArchitectureComponent} from './pages/architecture/architecture.component';
import {TestingLibrariesComponent} from './pages/front/testing-libraries/testing-libraries.component';
import {ParadigmsComponent} from './pages/front/paradigms/paradigms.component';
import { BackFwkComponent } from './pages/back/back-fwk/back-fwk.component';
import { BackParadigmsComponent } from './pages/back/back-paradigms/back-paradigms.component';
import {BackTestingFwkComponent} from './pages/back/back-testing-fwk/back-testing-fwk.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'front', component: FrontComponent, children: [
      {path: 'ui-libraries', component: UiLibrariesComponent},
      {path: 'testing-libraries', component: TestingLibrariesComponent},
      {path: 'paradigms', component: ParadigmsComponent},
    ]
  },
  {
    path: 'back', component: BackComponent, children: [
      {path: 'back-fwk', component: BackFwkComponent},
      {path: 'back-testing-fwk', component: BackTestingFwkComponent},
      {path: 'back-paradigms', component: BackParadigmsComponent},
    ]
  },
  {path: 'architecture', component: ArchitectureComponent},
];
