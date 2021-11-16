import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/base/loader.service';
import { SpService } from './services/base/sp.service';
import { UserService } from './services/base/user.service';
import { Packer } from "docx";
import * as fs from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //isNavActive:boolean = false;
  
  constructor(
    public loaderService:LoaderService,
    public sp:SpService,
    private spinner: NgxSpinnerService
    ){
    
  }

  ngOnInit(): void {
    //On every 25 minutes 
    setInterval(() => {
     this.callSharepointContextService();
     //this.callApiToken();    
   }, 1500000); // 25 minutes
   //}, 120000); // 2 minutes
   }  

   ApiCallCount:number = 0;
  callSharepointContextService(){
    //after u get data       
    this.sp.getContext().then(res=>{ 
      this.spinner.hide();     
      this.ApiCallCount++;       
    });
  }
  
}

export function UserProviderFactory(userProvider: UserService) {
  return () => userProvider.load();
}
