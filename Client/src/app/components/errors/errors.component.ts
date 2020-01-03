import { Component, OnInit, ElementRef } from '@angular/core';
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

  constructor(private auth: AuthService, private errService: ErrService) { }

  ngOnInit() {
    this.auth.CheckTokenValidation();
    this.errService.requestErrors();
    this.errService.getErrors().subscribe((errors: []) => {
      this.buildData = errors;
      this.buildChart();
    });


  }
  buildChart() {
    var chart = c3.generate({
      data: {
        columns: this.buildData,
        type: 'bar',
        color : function (color, d) {
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

