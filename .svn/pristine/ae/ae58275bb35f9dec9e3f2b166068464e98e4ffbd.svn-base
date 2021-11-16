import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-my-box',
  templateUrl: './my-box.component.html',
  styleUrls: ['./my-box.component.scss']
})
export class MyBoxComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  @Input() title:string ="";
  @Input() icon:string ="";
  @Output() myClick = new EventEmitter<any>();

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.myClick.emit();
  }

}
