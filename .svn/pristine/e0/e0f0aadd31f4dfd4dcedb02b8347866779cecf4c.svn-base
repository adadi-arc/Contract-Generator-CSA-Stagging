import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit, OnChanges {
 

  @Input() data:any[]=[];
  @Input() title:string="";
  @Input() icon:string="";
  @Input() search:boolean=false;
  @Output() myClick = new EventEmitter<any>();;
  @Input() image:boolean=false;
  searchList:any[]=[];

  @Input() val1: any = null;
  @Input() val2: any = null;
  @Input() val3: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.searchList = this.data;
  }
  

  onClick(row:any){
    this.myClick.emit(row);
  }

  getValue(option){
    return option[this.title];
  }

  applyFilter(value) {
    if (value != '' && value != null && value != undefined) {
      this.searchList = this.data.filter(res => {
        return res[this.title].toString().toLowerCase().indexOf(value) !== -1;
      })
    }
    else
      this.searchList = this.data;
  }

  getVal1(option){    
    if (this.val1)
      return option[this.val1.name] == null ? '' : option[this.val1.name];
    else
      return '';
  }

  getVal2(option){    
    if (this.val2)
      return option[this.val2.name] == null ? '' : option[this.val2.name];
    else
      return '';
  }

  getVal3(option){
    if(this.val3)
      return option[this.val3.name] == null ? '' : option[this.val3.name];
    else 
      return '';
  }

}
