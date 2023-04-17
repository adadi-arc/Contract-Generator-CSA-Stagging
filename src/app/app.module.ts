import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent, UserProviderFactory } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteService } from './services/base/route.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/base/interceptor/http-config.interceptor';
import { BaseService } from './services/base/base.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PageNotFoundComponent } from './modules/main/page-not-found/page-not-found.component';
import { BaseComponent } from './modules/base/base.component';
import { AppInjectorService } from './services/base/app-injector.service';
import { UserService } from './services/base/user.service';
import { ApplicationPipesModule } from './services/AppPipesModule';
import { ShareBtnComponent } from './modules/share/share-btn/share-btn.component';
// import { ServicecontractformComponent } from './modules/servicecontract/servicecontractform/servicecontractform.component';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,    
    PageNotFoundComponent,
    BaseComponent,
    ShareBtnComponent,
    // ServicecontractformComponent,    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    NgxSpinnerModule,
    ApplicationPipesModule
  ],
  providers: [
    BaseService,
    RouteService,    
    {provide:HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi:true},
    {provide: APP_INITIALIZER, useFactory: UserProviderFactory, deps: [UserService], multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(injector: Injector) {    
    AppInjectorService.injector = injector;
  }
}
