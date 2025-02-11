import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {FrontComponent} from './pages/front/front.component';
import {UiLibrariesComponent} from './pages/front/ui-libraries/ui-libraries.component';
import {BackComponent} from './pages/back/back.component';
import {ArchitectureComponent} from './pages/architecture/architecture.component';
import {TestingLibrariesComponent} from './pages/front/testing-libraries/testing-libraries.component';
import {BackPresentationComponent} from './pages/back/back-presentation/back-presentation.component';
import {BackTestingFwkComponent} from './pages/back/back-testing-fwk/back-testing-fwk.component';
import {AvailabilityComponent} from './pages/architecture/availability/availability.component';
import {RssFrontComponent} from './pages/front/rss-front/rss-front.component';
import {RssBackComponent} from './pages/back/rss-back/rss-back.component';
import {TestOverviewComponent} from './pages/test-overview/test-overview.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'front', component: FrontComponent, children: [
      {path: 'ui-libraries', component: UiLibrariesComponent},
      {path: 'testing-libraries', component: TestingLibrariesComponent},
      {path: 'rss-front', component: RssFrontComponent},
    ]
  },
  {
    path: 'back', component: BackComponent, children: [
      {path: 'back-fwk', component: BackPresentationComponent},
      {path: 'back-testing-fwk', component: BackTestingFwkComponent},
      {path: 'rss-back', component: RssBackComponent},
    ]
  },
  {
    path: 'architecture', component: ArchitectureComponent, children: [
      {path: 'availability', component: AvailabilityComponent},
    ]
  },
  {path: 'test-overview', component: TestOverviewComponent}
];
