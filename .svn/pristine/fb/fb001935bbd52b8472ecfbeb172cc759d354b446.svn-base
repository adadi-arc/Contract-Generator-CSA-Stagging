import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-my-input-number',
  templateUrl: './my-input-number.component.html',
  styleUrls: ['./my-input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputNumberComponent),
      multi: true
    }
  ]
})
export class MyInputNumberComponent implements OnInit, ControlValueAccessor  {

  @Input() label:string = "";
  @Input() placeHolder:string = "";
  @Input() hint:string = null;
  @Input() cls:string = "";
  @Input() required: boolean=false;
  @Input() model:any = null;
  @Input() name:string = "";
  @Output() change = new EventEmitter<any>();
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
}
