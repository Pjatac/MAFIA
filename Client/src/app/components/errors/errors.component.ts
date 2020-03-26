import { Component, OnInit, Input } from '@angular/core';
import * as c3 from 'c3';
import { AuthService } from 'src/app/services/auth.service';
import { ErrService } from 'src/app/services/err.service'
import { TFParams } from 'src/app/models/tfparams';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  @Input() printMode: boolean;
  @Input() showErrors: boolean;

  buildData: any;

  wsSelectTitle = "Web Service";
  apiSelectTitle = "API's";
  simpleSelectionTitle = "Period";
  topSelectionTitle = "TOP";
  topsList = [
    { value: '5', viewValue: 'Top five' },
    { value: '10', viewValue: 'Top ten' }
  ];
  apiList = [];

  params = new TFParams({start: 0, end: 24*60*60*1000}, 5, Date.now(), []);

  constructor(private auth: AuthService, private errService: ErrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show('errorspiner');
    this.auth.CheckTokenValidation();
    this.errService.requestErrors();
    this.errService.getErrors().subscribe((errors: []) => {
      this.buildData = errors;
      if (!this.errService.wsData) {
        this.errService.wsData = errors;
        this.apiList = this.params.apiList = this.errService.getApiList();
      }
      this.buildChart();
      this.spinner.hide('errorspiner');
    });
  }

  changePeriodSelection(period) {
    this.spinner.show('errorspiner');
    this.params.period = period;
    this.errService.requestErrors(this.params);
  }

  changeTop(top) {
    this.spinner.show('errorspiner');
    this.params.top = top;
    this.errService.requestErrors(this.params);
  }

  changeAPISelection(apis) {
    this.spinner.show('errorspiner');
    this.params.apiList = apis;
    this.errService.requestErrors(this.params);
  }

  changeDate(date) {
    this.spinner.show('errorspiner');
    this.params.date = date;
    this.errService.requestErrors(this.params);
  }

  buildChart() {
    c3.generate({
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

