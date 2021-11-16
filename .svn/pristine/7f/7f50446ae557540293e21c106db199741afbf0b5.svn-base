import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MyFormDialogComponent } from 'src/app/shared/Dialog/my-form-dialog/my-form-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(component): void {
    const dialogRef = this.dialog.open(MyFormDialogComponent, {
      disableClose: true ,      
      height:"100%",
      maxHeight:"100vh",
      panelClass:'dialog-panel',
      position: { right: 0 + 'px', top: 0 + 'px' },   
      autoFocus: false ,
      data: { component: component }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

}
