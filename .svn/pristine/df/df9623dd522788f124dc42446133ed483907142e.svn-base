import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/base/authenticate.service';
import { UserService } from 'src/app/services/base/user.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Input() appName: string = "";
  @Output() menuClick = new EventEmitter<any>();
  @Output() appClick = new EventEmitter<any>();
  @Output() logoutClick = new EventEmitter<any>();
  constructor(
    public theme: ThemeService,
    public router: Router,
    public authenticate: AuthenticateService,
    public user: UserService
  ) { }

  ngOnInit(): void {
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  onAppClick() {
    this.appClick.emit();
  }

  onlogoutClick() {
    this.logoutClick.emit();
  }

  login() {

  }

  signup(formType: string) {

  }

}
