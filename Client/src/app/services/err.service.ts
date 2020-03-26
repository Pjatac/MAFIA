import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ErrService {

  wsData;

  constructor(private socket: Socket) { }

  requestErrors(props?) {
    this.socket.emit('getErrors', props);
  }

  getErrors() {
    return this.socket.fromEvent('getErrors');
  }

  getApiList() {
    let apiList = [];
    this.wsData.forEach(ws => {
      apiList.push(ws[0]);
    });
    return apiList;
  }
}
