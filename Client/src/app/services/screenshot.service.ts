import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {
  public states = {
    //cpuChart
    1: { status: false },
    //memChart
    2: { status: false },
    //respPie
    3: { status: false },
    //timePie
    4: { status: false },
    //failChart
    5: { status: false }
  }

  public filterList = [
    { "id": 1, "itemName": "Virtual Machine / Cpu" },
    { "id": 2, "itemName": "Virtual Machine / Memory" },
    { "id": 3, "itemName": "Responsive Metrics / Codes" },
    { "id": 4, "itemName": "Responsive Metrics / Times" },
    { "id": 5, "itemName": "Top Failed" }
  ];

  constructor(private socket: Socket) { }

  sendMail(mailStruct) {
    this.socket.emit('mailSendRequest', mailStruct);
    return this.socket.fromEvent('mailSendResult');
  }

  setSelected(selected: [{id: number, itemName: string}]) {
    this.statesInit();
    selected.forEach(item => {
      this.states[item["id"]].status = true;
    });
  }

  statesInit() {
    this.states[1].status = false;
    this.states[2].status = false;
    this.states[3].status = false;
    this.states[4].status = false;
    this.states[5].status = false;
  }
}
