import { Component, OnInit, OnChanges } from '@angular/core';
import { RouteService } from '../../../services/base/route.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/base/theme.service';
import { AuthenticateService } from 'src/app/services/base/authenticate.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title = 'ARC';
  isNavActive: boolean = false;

  constructor(
    //public routeSerice:RouteService,
    public theme: ThemeService,
    public router: Router,
    public authenticate: AuthenticateService
  ) { }

  ngOnInit(): void {
    /*
    var token = localStorage.getItem("bmsToken");
    if (token == "" || token == null) {
      this.authenticate.isLoggedIn = false;      
    }
    else {
      this.authenticate.isLoggedIn = true;    
    }
    */
  }

  // openLink(module:string, routeName:string ){
  //   this.router.navigate([this.routeSerice.openRoute(module, routeName)]);
  // }

  onOpenNav() {
    this.isNavActive = true;
  }

  onCloseNav() {
    this.isNavActive = false;
  }

  logout() {
    /*
    this.authenticate.logout().then(res => {
      localStorage.setItem('bmsToken', '');
      this.authenticate.isLoggedIn = false;
      // this.router.navigate(['/login']);
      this.router.navigate(['/app/home']);
    }, error => {
      console.log(error);
    })
    */
  }

  onAppClick() {
    this.router.navigate(['/app/home']);
  }

}


