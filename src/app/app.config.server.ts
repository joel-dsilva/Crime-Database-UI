import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server'; // <--- THIS IS CRITICAL
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering() // <--- THIS FIXES THE NG0401 ERROR
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);