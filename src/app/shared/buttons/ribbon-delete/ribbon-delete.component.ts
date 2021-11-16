import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-ribbon-delete',
  templateUrl: './ribbon-delete.component.html',
  styleUrls: ['./ribbon-delete.component.scss']
})
export class RibbonDeleteComponent implements OnInit {
  
  @Output() myClick = new EventEmitter<any>();

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.myClick.emit();
  }

}
