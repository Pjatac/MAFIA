import { Component, OnChanges, Input } from '@angular/core';
import * as c3 from 'c3';
import { VMService } from 'src/app/services/vm.service';

@Component({
  selector: 'app-cpu-chart',
  templateUrl: './cpu-chart.component.html',
  styleUrls: ['./cpu-chart.component.css']
})
export class CpuChartComponent implements OnChanges {
  @Input() chartData;

  constructor(private vmService: VMService) { }

  ngOnChanges() {
    this.buildChart();
  }
  buildChart() {
    this.chartData = {
      columns: this.chartData
    };
    let chart = c3.generate({
      bindto: '#cpuChart',
      data: this.chartData,
      axis: {
        x: {
          label: {
            text: 'Time',
            position: 'outer-right'
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
