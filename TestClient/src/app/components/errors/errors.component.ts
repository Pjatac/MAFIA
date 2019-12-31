import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var chartBar = c3.generate({
      data: {
        columns: [
            ['AuthMng/LogIn', 50],
            ['ClientManager/Edit', 0],
            ['ClientManager/Create', 110],
            ['AuthMng/LogOut', 72]
        ],
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