import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-button-save',
  templateUrl: './button-save.component.html',
  styleUrls: ['./button-save.component.scss']
})
export class ButtonSaveComponent implements OnInit {
  @Input() valid:boolean = false;
  @Output() myClick =  new EventEmitter();
  
  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.myClick.emit();
  }

}
