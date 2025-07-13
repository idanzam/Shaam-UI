import { makeEnvironmentProviders } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import MyPreset from './services/mypreset';

export const appConfig = makeEnvironmentProviders ([

        provideAnimationsAsync(),
        providePrimeNG({ 
            theme: { preset: MyPreset, 
                     options: { 
                                darkModeSelector: false || '.my-app-dark'            
                              } 
                    }
            
        })    
]);
