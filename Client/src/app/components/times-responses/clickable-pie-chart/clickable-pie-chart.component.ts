import { Component, OnChanges, Input } from '@angular/core';
import * as c3 from 'c3';
import { PieChartDialogComponent } from '../pie-chart-dialog/pie-chart-dialog.component';
import { TrService } from '../../../services/tr.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-clickable-pie-chart',
  templateUrl: './clickable-pie-chart.component.html',
  styleUrls: ['./clickable-pie-chart.component.css']
})
export class ClickablePieChartComponent implements OnChanges {

  @Input() disable: boolean = false;
  @Input() name;
  @Input() chartData;
  constructor(public dialog: MatDialog, private trService: TrService) { }

  ngOnChanges() {
    this.buildChart(this.chartData);
  }

  buildChart(chartData) {
    c3.generate({
      bindto: document.getElementById(this.name),
      data: {
        columns: chartData,     
        type: 'pie',
        onclick: (d, i) => { 
          if(!this.disable){
            let data;
            switch (this.name) {
              case "codes": {
                data = this.trService.getCurrentPiceData(this.name, d.id);
                break;
              }
              case "times": {
                data = this.trService.getCurrentPiceData(this.name, d.id);
                break;
              }
            }
            this.dialog.open(PieChartDialogComponent,  { panelClass: 'custom-dialog-container', data: {data: data, title: d.id }}); 
          }
        }
      }
    });
  }

}
