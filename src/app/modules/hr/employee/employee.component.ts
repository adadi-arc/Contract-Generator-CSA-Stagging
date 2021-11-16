import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employees.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseComponent implements OnInit {
  obj: Employee;
  constructor(public employeeService: EmployeeService, public route: ActivatedRoute,
    public router: Router) {

    super(route);
    this.obj = new Employee();
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.primaryKey > 0)
      this.getData();

  }
  async getData() {
    await this.employeeService.getById(this.primaryKey).then(res => {
      this.obj = res['d'] as any;
    });
  }
  SaveEmployee() {

    if (this.primaryKey == 0) {
      this.employeeService.post(this.obj).subscribe(res => {
      // this.router.navigate(["/app/customer/list"]); //enable and enter employeelist
      }); // Inserting Data
    }
    else {
      this.employeeService.update(this.obj, this.obj.ID).then(res => {
      // this.router.navigate(["/app/customer/list"]); //enable and enter employeelist
      }); // Updating Data
    }
  }



  onDelete() {
    if (this.primaryKey > 0) {
      this.employeeService.delete(this.primaryKey).then(res => {
        // this.router.navigate(["/app/customer/list"]); //enable and enter employeelist
      })
    }
  }

  onBack() {
    // this.router.navigate(["/app/customer/list"]);
  }
}
