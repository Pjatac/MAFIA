import { Component, OnChanges, Input } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-time-pie-chart',
  templateUrl: './time-pie-chart.component.html',
  styleUrls: ['./time-pie-chart.component.css']
})
export class TimePieChartComponent implements OnChanges {
  @Input() chartData;
  constructor() { }

  ngOnChanges() {
    this.buildChart(this.chartData);
  }

  buildChart(chartData) {
    let chart = c3.generate({
      bindto: '#timePieChart',
      data: {
        columns: chartData,     
        type: 'pie'
      }
    });
  }
}
