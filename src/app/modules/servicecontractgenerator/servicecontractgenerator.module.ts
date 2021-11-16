import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicecontractgeneratorRoutingModule } from './servicecontractgenerator-routing.module';
import { ServicecontractgeneratorComponent } from './servicecontractgenerator.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicecontractformComponent } from './servicecontractform/servicecontractform.component';

@NgModule({
  declarations: [ServicecontractgeneratorComponent, ServicecontractformComponent],
  imports: [
    CommonModule,
    ServicecontractgeneratorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,    
    NgxSpinnerModule
  ]
})
export class ServicecontractgeneratorModule { }
