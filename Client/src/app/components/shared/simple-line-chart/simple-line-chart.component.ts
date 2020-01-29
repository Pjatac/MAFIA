import { Component, Input, OnChanges, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import { Helper } from 'src/app/helpers/helper';

@Component({
  selector: 'app-simple-line-chart',
  templateUrl: './simple-line-chart.component.html',
  styleUrls: ['./simple-line-chart.component.css'],
  //to remove background artefacts
  encapsulation: ViewEncapsulation.None
})
export class SimpleLineChartComponent implements AfterViewInit, OnChanges {
  @Input() name;
  @Input() chartData;
  @Input() period;
  init = true;

  constructor() { }

  ngOnChanges() {
    if (!this.init) {
      console.log(`new data for ${this.name} on ${new Date()}`);
      this.buildChart();
    }
  }
  
//need for intit chart
  ngAfterViewInit() {
    if (this.init) {
      this.buildChart();
      this.init = false;
    }
  }

  buildChart() {
    let columns = Helper.buildAxisXLabels(this.period);
    let chartData = this.chartData;
    //adding columns
    chartData.unshift(columns);
    chartData = {
      x: 'x',
      columns: chartData
    };
    c3.generate({
      bindto: document.getElementById(this.name),
      data: chartData,
      axis: {
        x: {
          type: 'indexed',
          label: {
            text: 'Time',
            position: 'outer-right'
          },
          tick: {
            format: function (d) {
              return d + 'min';
            }
          }
        },
        y: {
          min: 10,
          max: 100,
          label: {
            text: this.name + ' usage',
            position: 'outer-center'
          },
          tick: {
            format: function (d) {
              return d + '%';
            }
          }
        }
      }
    });
  }
}
