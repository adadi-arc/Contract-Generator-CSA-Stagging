import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-ribbon-save',
  templateUrl: './ribbon-save.component.html',
  styleUrls: ['./ribbon-save.component.scss']
})
export class RibbonSaveComponent implements OnInit {
  @Input() valid:boolean = false;
  @Output() myClick =  new EventEmitter();
  
  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.myClick.emit();
  }


}
