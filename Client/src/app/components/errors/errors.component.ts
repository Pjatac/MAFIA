import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import AuthService from 'src/app/services/auth.service';
import ErrService from 'src/app/services/err.service'

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  buildData: any;

  wsSelectTitle = "Web Service";
  apiSelectTitle = "API's";
  simpleSelectionTitle = "Period";
  topSelectionTitle = "TOP";
  topsList = [
    {value: '5', viewValue: 'Top five'},
    {value: '10', viewValue: 'Top ten'}
  ];
  periods  = [
    {value: '1', viewValue: '1 minute'},
    {value: '5', viewValue: '5 minutes'},
    {value: '15', viewValue: '15 minutes'},
    {value: '30', viewValue: '30 minutes'},
    {value: '60', viewValue: '1 hour'}
  ];
  wsList = [];
  apiList = [];

  constructor(private auth: AuthService, private errService: ErrService) { }

  ngOnInit() {
    this.auth.CheckTokenValidation();
    this.errService.requestErrors();
    this.errService.getErrors().subscribe((errors: []) => {
      this.buildData = errors;
      this.errService.wsData = errors;
      let lists = this.errService.getLists();
      this.apiList = lists.apiList;
      this.wsList = lists.wsList;
      this.buildChart();
    });
  }

  changePeriod(period) {
    
  }

  buildChart() {
    var chart = c3.generate({
      data: {
        columns: this.buildData,
        type: 'bar',
        color: function (color, d) {
          return "#0000FF";
        },
        labels: true
      },
      bar: {
        width: {
          ratio: 0.5
        },
        space: 0.75

      },
    });
  }
}

