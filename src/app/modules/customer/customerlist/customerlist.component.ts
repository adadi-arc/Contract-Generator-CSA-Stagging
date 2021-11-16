import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from '../customer/customer.component';
import { DialogService } from 'src/app/services/base/dialog.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.scss']
})
export class CustomerlistComponent implements OnInit {

  columns = [
    {
      columnDef: 'Title',
      type:'text',
      header: 'Customer Name',
      cell: (element: any) => `${element.Title}`,
      filterData:[],
      filterValue:""
    },
    {
      columnDef: 'Phone',
      type:'text',
      header: 'Phone',      
      cell: (element: any) => `${element.Phone}`,
      filterData:[],
      filterValue:""
    },
    {
      columnDef: 'Amount',
      type:'currency',
      header: 'Amount',
      cell: (element: any) => `${element.Amount}`,
      filterData:[],
      filterValue:""
    },
    {
      columnDef: 'CustomerType.Title',
      type:'text',
      header: 'Customer Type',
      cell: (element: any) => `${element.CustomerType.Title}`,
      filterData:[],
      filterValue:""
    }
  ];

  data: any[] = [];
    
  constructor(
    public route: Router,
    public customerService: CustomerService //inject service
    ) { }

  ngOnInit(): void {

  }

  getData(){ //reference service funtion
    this.customerService.getAll().then(res=>{ //.thn for async
      this.data = res['d'].results as any[];      
    })
  }

  ngAfterViewInit(): void {
    this.getData(); //insert data into data variabnle in line 50
  }


  onAdd(){
    this.route.navigate(["/app/customer/form"]);
  }

  onEdit(row:any){
    this.route.navigate(["/app/customer/form"], { queryParams: { ID: row.ID } });
  }

  
}
