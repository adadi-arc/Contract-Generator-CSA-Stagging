import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { HrComponent } from './hr.component';

const routes: Routes = [
  { path: '', component: HrComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employeelist', component: EmployeelistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
