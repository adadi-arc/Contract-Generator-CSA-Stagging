import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/base/theme.service';

@Component({
  selector: 'app-button-save-dialog',
  templateUrl: './button-save-dialog.component.html',
  styleUrls: ['./button-save-dialog.component.scss']
})
export class ButtonSaveDialogComponent implements OnInit {

  @Input() valid:boolean = false;
  @Output() click =  new EventEmitter();

  constructor(public theme:ThemeService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }

}
