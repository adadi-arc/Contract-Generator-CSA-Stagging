import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicecontractformComponent } from './servicecontractform/servicecontractform.component';
import { ServicecontractgeneratorComponent } from './servicecontractgenerator.component';

const routes: Routes = [
  { path: '', component: ServicecontractgeneratorComponent },
  { path: 'ServiceContractForm', component: ServicecontractformComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicecontractgeneratorRoutingModule { }
