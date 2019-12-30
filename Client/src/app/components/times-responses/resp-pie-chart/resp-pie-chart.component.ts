import { Component, OnChanges, Input } from '@angular/core';
import { PieChartDialogComponent } from '../pie-chart-dialog/pie-chart-dialog.component';
import TrService from '../../../services/tr.service';
import * as c3 from 'c3';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-resp-pie-chart',
  templateUrl: './resp-pie-chart.component.html',
  styleUrls: ['./resp-pie-chart.component.css']
})
export class RespPieChartComponent implements OnChanges {

  @Input() chartData;
  constructor(public dialog: MatDialog, private trService: TrService) { }

  ngOnChanges() {
    this.buildChart(this.chartData);
  }

  buildChart(chartData) {
    let chart = c3.generate({
      bindto: '#respPieChart',
      data: {
        columns: chartData,     
        type: 'pie',
        onclick: (d, i) => { 
          let data = this.trService.getCurrentCodeData(d.id);
          this.dialog.open(PieChartDialogComponent,  { data: {data: data, title: d.id }}); 
        }
      }
    });
  }
}
