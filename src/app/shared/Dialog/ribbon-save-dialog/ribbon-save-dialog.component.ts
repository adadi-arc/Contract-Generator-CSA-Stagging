import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-ribbon-save-dialog',
  templateUrl: './ribbon-save-dialog.component.html',
  styleUrls: ['./ribbon-save-dialog.component.scss']
})
export class RibbonSaveDialogComponent implements OnInit {

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

}
