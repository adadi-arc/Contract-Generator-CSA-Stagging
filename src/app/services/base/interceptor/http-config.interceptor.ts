import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader.service';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public loaderService:LoaderService, private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //this.loaderService.isLoading.next(true);

   //request.headers.set("Token", localStorage.getItem("bmsToken"));
   //request.headers.append("Token", localStorage.getItem("bmsToken"));
   if (localStorage.getItem("bmsToken") != null && localStorage.getItem("bmsToken") != undefined) {
    request = request.clone({
      setHeaders: {
        'Token': localStorage.getItem("bmsToken"),
      },
    });
  }

    this.spinner.show();
    return next.handle(request).pipe(
      finalize(
        () =>{
          //this.loaderService.isLoading.next(false);
          this.spinner.hide();
        }
      )
    );
  }

  // getHeaders(){
  //   const httpOptions = {
  //     headers: new HttpHeaders({        
  //       'Token': localStorage.getItem("bmsToken"),       
  //     })      
  //   };

  //   return httpOptions;
  // }
}
