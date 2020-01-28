import { Component, AfterViewInit, Input } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-simple-pie-chart',
  templateUrl: './simple-pie-chart.component.html',
  styleUrls: ['./simple-pie-chart.component.css']
})
export class SimplePieChartComponent implements AfterViewInit {

  @Input() name;
  @Input() chartData;
  constructor() { }

  ngAfterViewInit() {
    let temp = document.getElementById(this.name);
    c3.generate({
      bindto: document.getElementById(this.name),
      data: {
        columns: this.chartData,
        type: 'pie'
      }
    });    
  
  }

}
