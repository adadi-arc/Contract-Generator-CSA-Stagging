import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  color: string = "blue";

  //#region  All elements style variable
  myTopNavColor = "";
  myLeftNavColor = "";
  myHeadingColor = "";
  myIconColor = "";
  myIconBgColor = "";
  myButtonBgColor = "";
  //#endregion

  constructor() {
    this.myTopNavColor = "my-bg-top-heading-" + this.color;
    this.myLeftNavColor = "my-bg-left-nav-" + this.color;
    this.myHeadingColor = "my-form-heading-" + this.color;
    this.myIconColor = "my-icon-color-" + this.color;
    this.myIconBgColor = "my-icon-bg-color-" + this.color;
    this.myButtonBgColor = "my-bg-button-" + this.color;
  }
}
