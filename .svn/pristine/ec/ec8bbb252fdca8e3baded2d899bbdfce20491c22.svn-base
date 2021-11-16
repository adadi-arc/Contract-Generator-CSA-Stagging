import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  readonly rootUrl: string = "http://localhost:57046/";

  constructor(public http: HttpClient) {
  }

  // async get(query: string) {
  //   return await this.http.get(this.rootUrl + query).toPromise();
  // }

  async get(controllerName: string, query?:any) {
    var qry = this.queryBuilder("?", query);
    return await this.http.get(this.rootUrl + controllerName + qry).toPromise();
  }

  // async getById(query: string, ID: number) {
  //   return await this.http.get(this.rootUrl + query + "(" + ID + ")").toPromise();
  // }

  async getById(controllerName: string, ID: number) {
    return await this.http.get(this.rootUrl + controllerName + "(" + ID + ")").toPromise();
  }

  post(controller: string, jsonBody: any) {
    return this.http.post(this.rootUrl + controller, jsonBody);
  }

  
  update(controller: string, jsonBody: any, ID: number) {
    return this.http.put(this.rootUrl + controller + "/" + ID,  jsonBody);
  }

  delete(controller: string, ID: number) {
    return this.http.delete(this.rootUrl + controller + "/" + ID);
  }

  queryBuilder(url: string, query: any): string {
    if (query) {
      if (query.select) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + '$select=' + query.select;
      }
      if (query.filter) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + '$filter=' + query.filter;
      }
      if (query.expand) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + '$expand=' + query.expand;
      }
      if (query.orderby) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + '$orderby=' + query.orderby;
      }
      if (query.top) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + '$top=' + query.top;
      }
      if (query.skip) {
        url += ((url.indexOf('?') === -1) ? '?' : '&') + '$skip=' + query.skip;
      }
    }
    return url;
  }

}
