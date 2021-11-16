import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './modules/main/home/home.component';
import { PageNotFoundComponent } from './modules/main/page-not-found/page-not-found.component';
import { LandingPageComponent } from './modules/main/landing-page/landing-page.component';
import { AuthGuardService } from './services/base/auth-guard.service';
import {ServicecontractformComponent} from './modules/servicecontractgenerator/servicecontractform/servicecontractform.component';
const routes: Routes = [

  { path: "", redirectTo: "/app/home", pathMatch: "full" },
  {
    path: "app", component: HomeComponent, runGuardsAndResolvers: 'always',
    children: [
      { path: "home", component: ServicecontractformComponent },
      { path: 'customer', canActivate: [AuthGuardService], loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },
      { path: 'hr', loadChildren: () => import('./modules/hr/hr.module').then(m => m.HrModule) },
      { path: 'servicecontractgenerator', loadChildren: () => import('./modules/servicecontractgenerator/servicecontractgenerator.module').then(m => m.ServicecontractgeneratorModule) }
    ]
  },

  

  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
      useHash: true, onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }

export const RoutingComponents = [
  HomeComponent,
  LandingPageComponent
]
