// application-pipes.module.ts
// other imports
//import { CommonModule } from '@angular/common';

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MatInputCurrencyDirective } from 'src/app/modules/base/mat-input-currency.directive';

//import { ClientNotesListComponent } from 'src/app/modules/shared/client-notes-list/client-notes-list.component';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // dep modules    
    //CommonModule    
  
  ],
  declarations: [     
    MatInputCurrencyDirective,
    
  ],
  exports: [    
      
    MatInputCurrencyDirective,    
    //CommonModule,
    //FormsModule
    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ApplicationPipesModule {}