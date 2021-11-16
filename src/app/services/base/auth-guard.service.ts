import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public authenticate: AuthenticateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return true;;
    /*
    var token = localStorage.getItem("arcToken");
    if (token == "" || token == null) {
      this.authenticate.isLoggedIn = false;
      this.router.navigate(["/app/home"]);
    }
    else {
      this.authenticate.isLoggedIn = true;
      return true;
    }


    return false;*/
  }

}
