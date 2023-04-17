import { Component, OnInit } from '@angular/core';
import { contract } from '../../servicecontractgenerator/servicecontractform/modal';

@Component({
  selector: 'app-share-btn',
  templateUrl: './share-btn.component.html',
  styleUrls: ['./share-btn.component.scss']
})
export class ShareBtnComponent implements OnInit {
  formData = new contract
  constructor() { }

  ngOnInit(): void {
  }

}
