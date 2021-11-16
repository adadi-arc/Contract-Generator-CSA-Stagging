import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-ribbon-add',
  templateUrl: './ribbon-add.component.html',
  styleUrls: ['./ribbon-add.component.scss']
})
export class RibbonAddComponent implements OnInit {

  @Output() myClick = new EventEmitter<any>();

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.myClick.emit();
  }


}
