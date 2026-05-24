import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideAnimations} from '@angular/platform-browser/animations';
import {importProvidersFrom} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      })),
    provideAnimations(),
    importProvidersFrom(
      MatSnackBarModule
    ),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )]
};
