import { Component, OnChanges, Input } from '@angular/core';
import { PieChartDialogComponent } from '../pie-chart-dialog/pie-chart-dialog.component';
import TrService from '../../../services/tr.service';
import * as c3 from 'c3';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-time-pie-chart',
  templateUrl: './time-pie-chart.component.html',
  styleUrls: ['./time-pie-chart.component.css']
})
export class TimePieChartComponent implements OnChanges {
  @Input() disable: boolean = false;
  @Input() chartData;
  constructor(public dialog: MatDialog, private trService: TrService) { }

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
          if (!this.disable) {
            let data = this.trService.getCurrentTimeData(d.id);
            this.dialog.open(PieChartDialogComponent, { panelClass: 'custom-dialog-container',data: { data: data, title: d.id } });
          }
        }
      }
    });
  }
}
