import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      HttpClientModule
    )
  ]
}).catch((err) => console.error(err));
