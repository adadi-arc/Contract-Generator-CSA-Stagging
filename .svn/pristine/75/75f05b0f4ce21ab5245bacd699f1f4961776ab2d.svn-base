import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../customer/customer/customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';


const routes: Routes = [  
  { path: 'list', component: CustomerlistComponent },  
  { path: 'form', component: CustomerComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }



