import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server'; // ✅ CORRECT IMPORT
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering() // ✅ This provides the "Platform" context required
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);