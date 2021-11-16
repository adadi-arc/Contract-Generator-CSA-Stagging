import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() label: string = "";
  @Input() imageurl: string = "";
  @Output() click =  new EventEmitter<any>();

  constructor(public theme:ThemeService
   ) { }

  ngOnInit(): void {
  }

  onOpenClick(){
    this.click.emit();
  }

  

}
