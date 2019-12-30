import { Component, OnInit } from '@angular/core';
import TrService from '../../services/tr.service';
import { TimeResponse } from '../../models/tr';

@Component({
  selector: 'app-times-responses',
  templateUrl: './times-responses.component.html',
  styleUrls: ['./times-responses.component.css']
})
export class TimesResponsesComponent implements OnInit {
  timeData = [];
  respData = [];

  constructor(private trService: TrService) { }

  ngOnInit() {
    // this.trService.requestResponses();
    // this.trService.getResponses().subscribe((responses: TimeResponse[]) => {
    //   this.trService.wsData = responses;
    //   this.respData = this.trService.getCodesData();
    //   this.timeData =  this.trService.getTimesData();
    // });
    let codes = ["200", "201", "400", "401", "404", "500"];
    let wsData = [{ name: "AuthMng", responses: [], apis: [{ name: "LogIn", errors: [] }, { name: "LogOut", errors: [] }] },
    { name: "ClientMng", responses: [], apis: [{ name: "Create", errors: [] }, { name: "Edit", errors: [] }, { name: "Del", errors: [] }] },
    { name: "MailMng", responses: [], apis: [{ name: "Send", errors: [] }, { name: "Check", errors: [] }] },
    { name: "Analitic", responses: [], apis: [{ name: "GetAll", errors: [] }, { name: "GetErr", errors: [] }, { name: "GetServ", errors: [] }, { name: "GetResp", errors: [] }] }];
    for (let i = 0; i < 1000; i++)
      wsData.forEach(ws => {
        let req = (Math.random() > 0.5);
        if (req) {
          let kind = Math.floor(Math.random() * 5);
          switch (kind) {
            case 1: {
              ws.responses.push(this.addResponse(50, codes));
              break;
            }
            case 2: {
              ws.responses.push(this.addResponse(500, codes));
              break;
            }
            case 3: {
              ws.responses.push(this.addResponse(1000, codes));
              break;
            }
            case 4: {
              ws.responses.push(this.addResponse(2000, codes));
              break;
            }
          }
        }
      });
    this.trService.wsData = wsData;
    this.respData = this.trService.getCodesData();
    this.timeData = this.trService.getTimesData();
  }
  addResponse(time, codes) {
    return { code: codes[Math.floor(Math.random() * codes.length)], time: Math.floor(Math.random() * time) }
  }
}