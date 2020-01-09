import { Component, OnChanges, Input } from '@angular/core';
import { MychartdialogComponent } from '../mychartdialog/mychartdialog.component';
import WSService from 'src/app/services/ws.service';
import * as c3 from 'c3';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-resp-pie-chart',
  templateUrl: './resp-pie-chart.component.html',
  styleUrls: ['./resp-pie-chart.component.css']
})
export class RespPieChartComponent implements OnChanges {
  @Input() chartData;
  constructor(public dialog: MatDialog, private wsService: WSService) { }

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
          let data = this.wsService.getCurrentCodeData(d.id);
          this.dialog.open(MychartdialogComponent,  { panelClass: 'custom-dialog-container',data: {data: data, title: d.id }}); 
        }
      }
    });
  }
}
