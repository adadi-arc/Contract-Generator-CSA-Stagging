import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { SpService } from './base/sp.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly listName: string = "Employee";
  constructor(private sp: SpService) {
  }

  async getAll() {
    var query = {
      select: "ID, Title, Salary, Modified,  Editor/Title",
      expand: "Editor",
      orderby: "Title asc"
    };

    return await this.sp.readItems(this.listName, query);
  }

  async getById(ID: number) {
    var query = {
      select: "ID, Title, Salary",

    };
    return await this.sp.readItemById(this.listName, ID, query);
  }

  post(jsonBody: any) {
    return this.sp.createSPItem(this.listName, this.listName, jsonBody);
  }

  update(jsonBody: any, ID: number) {
    return this.sp.updateItem(this.listName, this.listName, ID, jsonBody)
  }

  delete(ID: number) {
    return this.sp.deleteItem(this.listName, ID);
  }
}
