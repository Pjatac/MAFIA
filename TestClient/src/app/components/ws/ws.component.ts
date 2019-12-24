import { Component, OnInit } from '@angular/core';
import WSService from 'src/app/services/ws.service';
import { WS } from 'src/app/models/wsresponse';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrls: ['./ws.component.css']
})
export class WsComponent implements OnInit {

  timeData = [];
  respData = [];

  constructor(private wsService: WSService) { }

  ngOnInit() {
    this.wsService.requestResponses();
    this.wsService.getResponses().subscribe((responses: WS[]) => {
      let codes = ['200', '201', '400', '401', '404', '500'];
      let times = ['<50', '500>>50', '999>>500', '>1000']
      let responsesPieData = [];
      let timesPieData = [];
      codes.forEach(code => {
        let pieData = [];
        pieData.push(code);
        pieData.push(0);
        responses.forEach(wsData => {
          wsData.responses.forEach(resp => {
            if (resp.code.toString() === code)
              pieData[1]++;
          });
        })
        responsesPieData.push(pieData);
      });
      times.forEach(time => {
        timesPieData.push([time, 0]);
      });
      responses.forEach(wsData => {
        wsData.responses.forEach(resp => {
          if (resp.time >= 1000)
            timesPieData[3][1]++;
          else if (resp.time >= 500)
            timesPieData[2][1]++;
          else if (resp.time >= 50)
            timesPieData[1][1]++;
          else
            timesPieData[0][1]++;
        });
      });
      this.respData = responsesPieData;
      this.timeData =  timesPieData;
    });
  }
}
