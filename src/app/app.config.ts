import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { withPreloading, PreloadAllModules, provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withPreloading(PreloadAllModules)), provideAnimationsAsync(), provideAnimationsAsync()]
};
