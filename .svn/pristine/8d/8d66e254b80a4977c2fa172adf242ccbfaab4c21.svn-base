import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Customers } from 'src/app/models/customers.model';

import { CustomerService } from '../../../services/customer.service';
import { CustomerType } from 'src/app/models/customer-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerTypeService } from 'src/app/services/customer-type.service';
import { BaseComponent } from '../../base/base.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent implements OnInit {

  obj: Customers;
  dataCustomerType: any[] = [];
  selectedCustomerType: CustomerType = null;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public customerService: CustomerService,
    public customerTypeService: CustomerTypeService
  ) {
    super(route);
    this.obj = new Customers();
  }

  ngOnInit(): void {
    super.ngOnInit();


    Promise.all([
      this.getCustomerType(),
    ]).then(res => {

      if (this.primaryKey > 0)
          this.getData();
    })

  }

  async getData() {
    await this.customerService.getById(this.primaryKey).then(res => {
      this.obj = res['d'] as any;
      this.setDropDowns();
    });
  }


  async getCustomerType() {
    await this.customerTypeService.getAll().then(res => {
      this.dataCustomerType = res['d'].results as any[];
    })
  }

  setDropDowns() {
    if (this.dataCustomerType.filter(res => res.ID == this.obj.CustomerTypeId).length > 0) {
      this.selectedCustomerType = this.dataCustomerType.filter(res => res.ID == this.obj.CustomerTypeId)[0];
    }
  }

  Save(): Observable<Object> {

    this.obj.CustomerTypeId = this.selectedCustomerType.ID;

    if (this.primaryKey == 0)
      return this.customerService.post(this.obj); // Inserting Data
    else {
      var cust = new Customers();
      cust.ID = this.obj.ID;
      cust.Phone = this.obj.Phone;
      cust.CustomerTypeId = this.obj.CustomerTypeId;
      cust.Amount = this.obj.Amount;
      cust.Title = this.obj.Title;
      this.customerService.update(cust, this.obj.ID).then(res => {
        
      }); // Updating Data
    }
  }

  async AfterSave() {
    this.router.navigate(["/app/customer/list"]);
  }

  onDelete() {
    if (this.primaryKey > 0) {
      this.customerService.delete(this.primaryKey).then(res => {
        this.router.navigate(["/app/customer/list"]);
      })
    }
  }

  onBack() {
    this.router.navigate(["/app/customer/list"]);
  }



}

