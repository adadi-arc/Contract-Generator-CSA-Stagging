import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { DialogService } from 'src/app/services/base/dialog.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  columns = [
    {
      columnDef: 'Title',
      type:'text',
      header: 'Title',
      cell: (element: any) => `${element.Title}`,
      filterData:[],
      filterValue:""
    },
    {
      columnDef: 'Salary',
      type:'text',
      header: 'Salary',      
      cell: (element: any) => `${element.Salary}`,
      filterData:[],
      filterValue:""
    }
  ];

  data: any[] = [];
    
  constructor(
    public route: Router,
    public employeeService: EmployeeService
    ) { }

  ngOnInit(): void {

  }

  getData(){
    this.employeeService.getAll().then(res=>{
      this.data = res['d'].results as any[];      
    })
  }

  ngAfterViewInit(): void {
    this.getData();
  }


  onEmployeeAdd(){
    this.route.navigate(["/app/employee/form"]);
  }

  onEmployeeEdit(row:any){
    this.route.navigate(["/app/employee/form"], { queryParams: { ID: row.ID } });
  }

  
}
