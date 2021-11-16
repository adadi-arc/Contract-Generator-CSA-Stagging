import { Injectable } from '@angular/core';
import { SpService } from './sp.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  IsAdmin:boolean = false;
  UserID:number = null;
  UserName:number = null;
  Email:number = null;
 
  constructor(private spServices: SpService) {
  }

  load(){
    return new Promise((resolve, reject) => {
   
      Promise.all([this.setUserDetails()]).then(res=>{                              
            this.IsAdmin = true;
            document.getElementById("authError").style.display = "none";
            resolve(true);  
          
      })   
      
  })
  }

  public async setUserDetails() {
      
    if (window.parent["_spPageContextInfo"] == undefined) {
      let spUser: any = await this.spServices.getLoggedInUser();
      spUser = spUser.d;
  
      this.UserID = spUser.Id;
      this.UserName = spUser.Title;
      this.Email = spUser.Email;  
    }
    else {
     
      this.UserID = window.parent["_spPageContextInfo"]["userId"];
      this.UserName = window.parent["_spPageContextInfo"]["userDisplayName"];
      this.Email = window.parent["_spPageContextInfo"]["userEmail"];  
    }
   
    
  }
}
