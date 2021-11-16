import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  
  readonly rootUrl: string = "http://localhost:57046/";
  isLoggedIn: boolean = false;
  
  constructor(public http: HttpClient) { }

  async Authenticate(userName: any, password: any) {
    const httpOptions = {
      headers: new HttpHeaders({        
        'Authorization': 'Basic ' + btoa(userName + ':' + password),       
      })
      , observe: 'response' as 'response'
    };
    
    return await this.http.post(this.rootUrl + 'authenticate', null, httpOptions).toPromise()      
  }

  async logout() {    
    
    return await this.http.post(this.rootUrl + 'logout', null).toPromise()      
  }
  
}
