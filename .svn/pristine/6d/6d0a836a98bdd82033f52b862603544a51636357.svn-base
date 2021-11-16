import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-ribbon-back',
  templateUrl: './ribbon-back.component.html',
  styleUrls: ['./ribbon-back.component.scss']
})
export class RibbonBackComponent implements OnInit {
  @Output() myClick = new EventEmitter<any>();

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.myClick.emit();
  }


}
