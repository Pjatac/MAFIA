import { Component, Input, OnChanges } from '@angular/core';
import * as c3 from 'c3';
import { VMService } from '../../services/vm.service';
import { Helper } from 'src/app/middleware/helper';

@Component({
  selector: 'app-mem-chart',
  templateUrl: './mem-chart.component.html',
  styleUrls: ['./mem-chart.component.css']
})
export class MemChartComponent implements OnChanges {
  @Input() chartData;
  @Input() period;

  constructor(private vmService: VMService) { }

  ngOnChanges(){
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
      bindto: '#memChart',
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
          min: 10,
          max: 100,
          label: {
            text: 'Memory usage',
            position: 'outer-center',
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
