import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from 'src/app/services/base/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-home-card',
  templateUrl: './module-home-card.component.html',
  styleUrls: ['./module-home-card.component.scss']
})
export class ModuleHomeCardComponent implements OnInit {

  @Input() moduleName:string ="";
  @Input() moduleHeading:string ="";

  constructor(
    public routeService: RouteService,
    public router: Router) { }

  ngOnInit(): void {

  }

  openLink(module: string, routeName: string) {
    this.router.navigate([this.routeService.openRoute(module, routeName)]);
  }

  openHome() {
    this.router.navigate(['/home']);
  }
}
