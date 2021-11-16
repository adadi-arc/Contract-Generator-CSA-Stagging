import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { SpService } from './base/sp.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly listName: string = "Customers"; //list name to reference

  constructor(private sp: SpService) { //inject spservice
  }

  async getAll() { //get selected items
    var query = {
      select: "ID, Title, CustomerTypeId, CustomerType/Title, Phone, Amount, Modified,  Editor/Title",
      expand: "CustomerType, Editor",
      orderby: "Title asc"
    };

    query = {
      select: "ID, Title, Phone, Amount, Modified",
      expand: "",
      orderby: "Title asc"
    };
    return await this.sp.readItems(this.listName, query);
  }

  async getById(ID: number) { //passing ID
    var query = {
      select: "ID, Title, CustomerTypeId, Phone, Amount",

    };
    return await this.sp.readItemById(this.listName, ID, query);
  } //GET request

  post(jsonBody: any) { //POST request
    return this.sp.createSPItem(this.listName, this.listName, jsonBody);
  }

  update(jsonBody: any, ID: number) { //update data
    return this.sp.updateItem(this.listName, this.listName, ID, jsonBody)
  }

  delete(ID: number) { //delete data
    return this.sp.deleteItem(this.listName, ID);
  }

}
