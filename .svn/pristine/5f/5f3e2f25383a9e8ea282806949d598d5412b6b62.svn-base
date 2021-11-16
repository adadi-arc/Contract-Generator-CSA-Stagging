import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RouteService } from 'src/app/services/base/route.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input('drawer') drawer: MatSidenav;

  modules: any[] = [
    { title: 'Home', module: '', routeName: '', icon: "home" },
    { title: 'Customer', module: 'customers', routeName: 'Customer', icon: "hail" },
  ];
  constructor(
    public routeSerice: RouteService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  openLink(module: string, routeName: string) {
    this.drawer.close()
    this.router.navigate([this.routeSerice.openRoute(module, routeName)]);
  }
}
