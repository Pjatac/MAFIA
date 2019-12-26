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
      this.wsService.wsData = responses;
      this.respData = this.wsService.getCodesData();
      this.timeData =  this.wsService.getTimesData();
    });
  }
}
