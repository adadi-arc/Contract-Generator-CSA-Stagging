import { Injectable } from '@angular/core';
import { SpService } from './base/sp.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  readonly listName: string = "CustomerType";

  constructor(private sp: SpService) {
  }

  async getAll() {
    var query = { 
      select: "ID, Title",      
      orderby: "Title asc"
     };
    return await this.sp.readItems(this.listName, query);
  }

}
