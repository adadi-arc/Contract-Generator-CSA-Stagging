import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/base/route.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(
    public routeSerice:RouteService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  
  openLink(module:string, routeName:string ){
    this.router.navigate([this.routeSerice.openRoute(module, routeName)]);
  }

}
