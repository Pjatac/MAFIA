import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as c3 from 'c3';

@Component({
  selector: 'app-pie-chart-dialog',
  templateUrl: './pie-chart-dialog.component.html',
  styleUrls: ['./pie-chart-dialog.component.css']
})
export class PieChartDialogComponent implements OnInit {

  constructor(private myDialogRef: MatDialogRef<PieChartDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    let chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: this.data.data,
        type: 'pie'
      }
    });
  }

  close() {
    this.myDialogRef.close();
  }
}