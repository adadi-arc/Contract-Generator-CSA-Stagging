import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Autocomplete } from 'src/app/shared/Autocomplete';

@Component({
  selector: 'app-my-auto-complete',
  templateUrl: './my-auto-complete.component.html',
  styleUrls: ['./my-auto-complete.component.scss']
})
export class MyAutoCompleteComponent implements OnInit {
  
  @Input() autocomp: Autocomplete<any> = null;
  @Input() label:string = "";
  @Input() placeHolder:string = "";
  @Input() hint:string = null;
  @Input() cls:string = "";
  @Input() required: boolean=false;
  @Input() model:any = null;
  @Input() name:string = "";
  @Output() change = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {

  }

  onChange(value:string){   
    this.change.emit(value);
  }

}
