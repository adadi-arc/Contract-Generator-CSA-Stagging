import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/services/base/snackbar.service';
import { AppInjectorService } from 'src/app/services/base/app-injector.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isModal: boolean = false;
  primaryKey: number = 0;
  snackBar: SnackbarService;

  constructor(
    public route: ActivatedRoute
  ) {
    this.snackBar = AppInjectorService.injector.get(SnackbarService);
  }

  ngOnInit(): void {
    if (this.isModal == false)
      window.scroll(0, 0);

    this.route.queryParams.subscribe(params => {
      this.primaryKey = params['ID'] || 0;
    });
  }

  BeforeGetData() {

  }

  GetData() {

  }

  AfterGetData() {

  }


  BeforeSave() {

  }

  onSave() {
    this.BeforeSave();
    this.Save().subscribe(res => {
      this.AfterSave().then(res => {
        this.snackBar.openSuccess();
      });
    }, error => {
      console.log(error);

    });
  }

  Save(): Observable<Object> {
    return null;
  }

  async AfterSave() {

  }

  BeforeEdit() {

  }

  Edit() {

  }

  AfterEdit() {

  }

  BeforeDelete() {

  }

  Delete() {

  }

  AfterDelete() {

  }



}
