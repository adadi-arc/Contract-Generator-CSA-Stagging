import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-my-heading',
  templateUrl: './my-heading.component.html',
  styleUrls: ['./my-heading.component.scss']
})
export class MyHeadingComponent implements OnInit {

  @Input() heading:string ="";

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

}
