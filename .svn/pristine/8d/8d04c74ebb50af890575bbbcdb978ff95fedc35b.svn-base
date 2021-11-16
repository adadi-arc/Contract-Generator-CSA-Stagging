import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly rootUrl: string = "https://arcserver.alrafayglobal.com:6111/api/documents/";

  constructor(
    public http: HttpClient,  
    private spinner: NgxSpinnerService) {
  }

  async get(query: string) {
    return await this.http.get(this.rootUrl + query).toPromise();
  }

  async getById(query: string, ID: number) {
    return await this.http.get(this.rootUrl + query + "(" + ID + ")").toPromise();
  }

  post(controller: string, jsonBody: any) {
    return this.http.post(this.rootUrl + controller, jsonBody, this.getPostHeaders());
  }


  fetch(query: string, fileURL: any, filename: string) {
    this.spinner.show();
    fetch(this.rootUrl + query, {
      body: JSON.stringify({ "FileURL": fileURL }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    }).then(res => res.blob()).then(res => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      this.spinner.hide();
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
    })

    //return this.http.post(this.rootUrl + controller, jsonBody, this.getPostHeaders());
  }


  getPostHeaders(){
    const httpOptions = {
      headers: new HttpHeaders({                
        'Content-Type':'application/json',
        'charset' : 'utf-8'
      })      
    };

    return httpOptions;
  }

  update(controller: string, jsonBody: any, ID: number) {
    return this.http.put(this.rootUrl + controller, jsonBody);
  }

  delete(controller: string, ID: number) {
    return this.http.delete(this.rootUrl + controller + "/" + ID);
  }
}
