import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-table-search',
  templateUrl: './my-table-search.component.html',
  styleUrls: ['./my-table-search.component.scss']
})
export class MyTableSearchComponent implements OnInit {

  @Output() change = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event){
    this.change.emit( (event.target as HTMLInputElement).value);
  }
}
