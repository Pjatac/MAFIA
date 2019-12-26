import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as c3 from 'c3';

@Component({
  selector: 'app-mychartdialog',
  templateUrl: './mychartdialog.component.html',
  styleUrls: ['./mychartdialog.component.css']
})

export class MychartdialogComponent implements OnInit {

  constructor(private myDialogRef: MatDialogRef<MychartdialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    let chart = c3.generate({
      bindto: '#chart',
          data: {
              columns: this.data.data,
              type : 'pie'
          }
      });
  }
  
  close(){
    this.myDialogRef.close();
  }
}
