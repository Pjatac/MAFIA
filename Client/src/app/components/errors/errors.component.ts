import { Component, OnInit, Input } from '@angular/core';
import * as c3 from 'c3';
import AuthService from 'src/app/services/auth.service';
import ErrService from 'src/app/services/err.service'
import { TFParams } from 'src/app/models/tfparams';
import { OurDialogComponent } from '../shared/our-dialog/our-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  @Input() printMode:boolean;
  @Input() showErrors:boolean;

  buildData: any;

  wsSelectTitle = "Web Service";
  apiSelectTitle = "API's";
  simpleSelectionTitle = "Period";
  topSelectionTitle = "TOP";
  topsList = [
    {value: '5', viewValue: 'Top five'},
    {value: '10', viewValue: 'Top ten'}
  ];
  wsList = [];
  apiList = [];

  params = new TFParams(1, 5, Date.now(), [], []);

  constructor(private auth: AuthService, private errService: ErrService, public dialog: MatDialog,) { }

  ngOnInit() {
    this.auth.CheckTokenValidation();
    this.errService.requestErrors();
    this.errService.getErrors().subscribe((errors: []) => {
      this.buildData = errors;
      this.errService.wsData = errors;
      let lists = this.errService.getLists();
      this.params.wsList = lists.wsList;
      this.params.apiList = lists.apiList;
      this.buildChart();
    });
  }

  changePeriod(period) {
    this.params.period = period;
    this.errService.requestErrors(this.params);
  }

  changeTop(top) {
    this.params.top = top;
    this.errService.requestErrors(this.params);
  }

  changeApiSelection(apis) {
    this.params.apiList = apis;
    this.params.wsList = this.errService.GetWSsByAPIs(apis);
    this.errService.requestErrors(this.params);
  }

  changeWsSelection(wss) {
    this.params.wsList = wss;
    this.params.apiList = this.errService.GetAPIsByWSs(wss);
    this.errService.requestErrors(this.params);
  }

  changeDate(date) {
    this.params.date = date;
    this.errService.requestErrors(this.params);
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

