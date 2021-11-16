import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ThemeService } from 'src/app/services/base/theme.service';

export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}


@Component({
  selector: 'app-my-table-report',
  templateUrl: './my-table-report.component.html',
  styleUrls: ['./my-table-report.component.scss']
})

export class MyTableReportComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() columns: any[] = [];
  @Input() dataSource: any[] = [];
  @Input() search: boolean = true;
  @Input() filter: boolean = false;
  @Input() paging: boolean = true;
  data: any;
  displayedColumns: string[] = [];

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
    //data = ELEMENT_DATA;
    this.data = new MatTableDataSource(this.dataSource);
    this.displayedColumns = this.columns.map(c => c.columnDef);
    //cols = this.columns.map(c => c.columnDef + "1");
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;

    // Overrride default filter behaviour of Material Datatable
    this.data.filterPredicate = this.createFilter();

    for (let index = 0; index < this.columns.length; index++) {
      const element = this.columns[index];
      element.filterData = this.getUnique(this.dataSource, element.columnDef);
    }

  }

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  applyFilter(event: String) {
    const filterValue = event;
    this.data.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {

  }


  getUnique(data: any[], columnName: string): any[] {
    return data.map(item => item[columnName]).filter((value, index, self) => self.indexOf(value) === index);
  }

  filterValues = {};
  // Called on Filter change
  filterChange(column, event) {
    //let filterValues = {}
    if (event == undefined || event == null) {

      if (this.filterValues[column.columnDef]) {
        delete this.filterValues[column.columnDef]
      }

      if (this.filterValues == null || this.filterValues == undefined || this.filterValues == "" || (this.filterValues && (Object.keys(this.filterValues).length === 0)))
        this.data.filter = "";
      else {
        this.filterValues[column.columnDef] = String(event);
        this.data.filter = JSON.stringify(this.filterValues)
      }

    }
    else {
      this.filterValues[column.columnDef] = String(event);
      this.data.filter = JSON.stringify(this.filterValues)
    }


  }


  /*
   // Custom filter method fot Angular Material Datatable
   createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    }
    return filterFunction;
    }
    */


  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) !== -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }
}
