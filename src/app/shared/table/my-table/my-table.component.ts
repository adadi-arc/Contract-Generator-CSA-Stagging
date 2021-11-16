import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ThemeService } from 'src/app/services/base/theme.service';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit,AfterViewInit, OnChanges {
 
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() columns: any[] =[];
  @Input() dataSource:any[]=[];
  @Input() excel:boolean=false;
  @Input() search:boolean=true;
  @Input() filter:boolean=false;
  @Input() paging:boolean=true;
  @Input() delete:boolean=false;
  data: MatTableDataSource<any>;
  displayedColumns: string[] =[]; 
  //actionColumns: string[] =['Add']; 
  
  @Output() onAdd = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  //displayedColumns: string[] = ['Name', 'Weight', 'Symbol', 'Position'];
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  
  
  constructor(public theme:ThemeService) {
   
   }

  ngOnInit(): void {
    // Inserting a column for add and edit button
    this.columns.splice(0, 0, {
      columnDef: 'action',
      header: '',
      type: 'button',
      cell: (element: any) => `${element.action}`,
      filterData: [],
    })


    //data = ELEMENT_DATA;   
    this.setTable();

    // Overrride default filter behaviour of Material Datatable
    //this.data.filterPredicate = this.createFilter();

    for (let index = 0; index < this.columns.length; index++) {
      const element = this.columns[index];
      element.filterData = this.getUnique(this.dataSource, element.columnDef);
    }


  }

  msg(row){
    console.log(row)
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  ngOnChanges(): void {
   this.setTable();
  }

  

  setTable(){
    this.data = new MatTableDataSource(this.dataSource);
    this.displayedColumns = this.columns.map(c => c.columnDef);    
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  onFilterClick(){
    // Overrride default filter behaviour of Material Datatable
    if(this.filter == false)
    {  
      this.filter = true
      this.setTable()
      this.data.filterPredicate = this.createFilter();
    }
    else
      {
        this.filter = false;
        this.setTable();
        //this.data.filterPredicate = null;
      }
    
  }

  applyFilter(event: String) {
    const filterValue = event;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  
 

  
  getUnique(data:any[], columnName:string):any[]{
    return data.map(item => item[columnName]).filter((value,index,self) => self.indexOf(value) === index);          
   }

   filterValues = {};
   // Called on Filter change
  filterChange(column, event) {
    //let filterValues = {}
    if (event == undefined ||  event == null) {

      if (this.filterValues[column.columnDef]) {
        delete this.filterValues[column.columnDef]
      }

      if (this.filterValues == null || this.filterValues == undefined || this.filterValues == "" ||  (this.filterValues && (Object.keys(this.filterValues).length === 0)))
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
  
  onAddClick(){
    this.onAdd.emit();
  }

  onEditClick(row){
    this.onEdit.emit(row);
  }

  onDeleteClick(row){
    this.onDelete.emit(row);
  }


 
}
