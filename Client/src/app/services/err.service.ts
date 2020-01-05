import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export default class ErrService {

  wsData;

  constructor(private socket: Socket) { }

  requestErrors(props?) {
    this.socket.emit('getErrors', props);
  }

  getErrors() {
    return this.socket.fromEvent('getErrors');
  }

  getLists() {
    let wsList = [];
    let apiList = [];
    this.wsData.forEach(ws => {
      apiList.push(ws[0]);
      let names = ws[0].split("/");
      if (wsList.indexOf(names[0]) == -1)
        wsList.push(names[0]);
    });
    return { wsList: wsList, apiList: apiList };
  }

  GetAPIsByWSs(wss) {
    return [];
  }

  GetWSsByAPIs(apis) {
    return [];
  }
}
