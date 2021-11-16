import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-my-select',
  templateUrl: './my-select.component.html',
  styleUrls: ['./my-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MySelectComponent),
      multi: true
    }
  ]
})
export class MySelectComponent implements OnInit , ControlValueAccessor {
  @Input() label:string = "";
  @Input() data:any[]= null;
  @Input() required: boolean = false;
  @Input() model: any = null;
  @Input() name: string = "";
  @Input() title:string = "";
  @Output() modelChange = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();
  

  constructor() { }

  
  writeValue(obj: any): void {
    if (obj !== undefined)
      this.model = obj;
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }


  ngOnInit(): void {
  }

  onChange(value: any) {
    this.propagateChange(value);
    this.valueChanged.emit(value);
  }

  getValue(option){
     return option[this.title];
  }

}
