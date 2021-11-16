import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';


@Component({
  selector: 'app-my-table-filter',
  templateUrl: './my-table-filter.component.html',
  styleUrls: ['./my-table-filter.component.scss']
})
export class MyTableFilterComponent implements OnInit {
  @Input() label:string = "";
  @Input() title:string = "";
  @Input() data:any[]= null;
  @Input() name:any[]= null;
  @Input() model:any = null;

  @Output() change = new EventEmitter<any>();

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onChange(value:any){   
    this.change.emit(value);
  }

}
