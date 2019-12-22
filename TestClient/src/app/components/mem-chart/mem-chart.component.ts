import { Component, Input, OnChanges } from '@angular/core';
import * as c3 from 'c3';
import { VMService } from '../../services/vm.service';

@Component({
  selector: 'app-mem-chart',
  templateUrl: './mem-chart.component.html',
  styleUrls: ['./mem-chart.component.css']
})
export class MemChartComponent implements OnChanges {
  @Input() chartData;

  constructor(private vmService: VMService) { }

  ngOnChanges(){
      this.buildChart();
  }
  buildChart() {
    this.chartData = {
      columns: this.chartData
    };
    let chart = c3.generate({
      bindto: '#memChart',
      data: this.chartData,
      axis: {
        x: {
          label: {
            text: 'Time',
            position: 'outer-right'
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
