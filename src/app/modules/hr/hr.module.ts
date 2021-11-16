import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeelistComponent } from './employeelist/employeelist.component';


@NgModule({
  declarations: [HrComponent, EmployeeComponent, EmployeelistComponent],
  imports: [
    CommonModule,
    HrRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,    
    NgxSpinnerModule
  ]
})
export class HrModule { }
