import { Component, OnChanges, Input } from '@angular/core';
import * as c3 from 'c3';
import { MatDialog } from '@angular/material';
import WSService from 'src/app/services/ws.service';
import { MychartdialogComponent } from '../mychartdialog/mychartdialog.component';

@Component({
  selector: 'app-time-pie-chart',
  templateUrl: './time-pie-chart.component.html',
  styleUrls: ['./time-pie-chart.component.css']
})
export class TimePieChartComponent implements OnChanges {
  @Input() chartData;
  constructor(public dialog: MatDialog, private wsService: WSService) { }

  ngOnChanges() {
    this.buildChart(this.chartData);
  }

  buildChart(chartData) {
    let chart = c3.generate({
      bindto: '#timePieChart',
      data: {
        columns: chartData,     
        type: 'pie',
        onclick: (d, i) => { 
          let data = this.wsService.getCurrentTimeData(d.id);
          this.dialog.open(MychartdialogComponent, { panelClass: 'custom-dialog-container',data: {data: data, title: d.id }}); 
        }
      }
    });
  }
}
