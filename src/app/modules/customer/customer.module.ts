import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from '../customer/customer/customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [    
    CustomerlistComponent,     
    CustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomerRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,    
    NgxSpinnerModule
  ],
  entryComponents:[        
  ]
})
export class CustomerModule { }
