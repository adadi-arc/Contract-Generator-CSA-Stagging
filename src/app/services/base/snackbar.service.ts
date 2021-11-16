import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/Dialog/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private durationInSeconds = 2;

  constructor(private _snackBar: MatSnackBar) {     
  }

  openSnackBar(message:string) {   
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data:{message: message}
    });
  }

  openSuccess() {   
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data:{message: "Successfully Saved!"}
    });
  }
}
