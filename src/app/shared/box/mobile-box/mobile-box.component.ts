import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-box',
  templateUrl: './mobile-box.component.html',
  styleUrls: ['./mobile-box.component.scss']
})
export class MobileBoxComponent implements OnInit {
  @Input() heading:string = ""; 
  @Input() icon:string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
