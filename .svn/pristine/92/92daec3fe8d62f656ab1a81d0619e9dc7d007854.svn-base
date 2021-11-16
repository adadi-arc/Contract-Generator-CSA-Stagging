import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss']
})
export class ModuleCardComponent implements OnInit {
  
  @Input() title: string = "";
  @Input() routes: any[] = [];

  constructor(  
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  openLink(url:string){
    this.router.navigate([url]);
  }
}
