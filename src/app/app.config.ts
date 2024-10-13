import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { loggerConfig } from './logger.config';
import { provideLogger } from './shared/util-logger';
import { TicketApiService } from './features/ticket/data/services/ticket-api.service';
import { UserApiService } from './features/user/data/services/user-api.service';
import { InMemoryDataService } from './shared/services/InMemoryDataService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withPreloading(PreloadAllModules),
      //  withDebugTracing(),
    ),
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(TicketApiService, { delay: 1000 })),
    importProvidersFrom(InMemoryWebApiModule.forRoot(UserApiService, { delay: 1000 })),
    importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })),

    provideLogger(loggerConfig),


    //    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
