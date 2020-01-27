import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pie-chart-dialog',
  templateUrl: './pie-chart-dialog.component.html',
  styleUrls: ['./pie-chart-dialog.component.css']
})
export class PieChartDialogComponent  {

  constructor(private myDialogRef: MatDialogRef<PieChartDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  close() {
    this.myDialogRef.close();
  }
}