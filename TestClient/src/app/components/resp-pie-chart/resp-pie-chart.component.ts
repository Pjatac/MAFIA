import { Component, OnChanges, Input } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-resp-pie-chart',
  templateUrl: './resp-pie-chart.component.html',
  styleUrls: ['./resp-pie-chart.component.css']
})
export class RespPieChartComponent implements OnChanges {
  @Input() chartData;
  constructor() { }

  ngOnChanges() {
    this.buildChart(this.chartData);
  }

  buildChart(chartData) {
    let chart = c3.generate({
      bindto: '#respPieChart',
      data: {
        columns: chartData,     
        type: 'pie'
      }
    });
  }
}
