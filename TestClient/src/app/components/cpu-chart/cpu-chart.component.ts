import { Component, OnChanges, Input } from '@angular/core';
import * as c3 from 'c3';
import { VMService } from 'src/app/services/vm.service';
import { Helper } from 'src/app/middleware/helper';

@Component({
  selector: 'app-cpu-chart',
  templateUrl: './cpu-chart.component.html',
  styleUrls: ['./cpu-chart.component.css']
})
export class CpuChartComponent implements OnChanges {
  @Input() chartData;
  @Input() period;

  constructor(private vmService: VMService) { }

  ngOnChanges() {
    this.buildChart();
  }
  buildChart() {
    let columns = Helper.buildAxisXLabels(this.period);
    let chartData = this.chartData;
    chartData.unshift(columns);
    chartData = {
      x: 'x',
      columns: chartData
    };
    let chart = c3.generate({
      bindto: '#cpuChart',
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
              return d+'min';
            }
          }
        },
        y: {
          min : 10,
          max: 100,
          label: {
            text: 'CPU usage',
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
