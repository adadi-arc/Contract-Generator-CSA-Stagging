import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @Input() label: string='';
  @Input() model: any = null;
  @Input() name: string = "";
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

}
