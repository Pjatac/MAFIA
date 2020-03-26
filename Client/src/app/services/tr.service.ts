import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TrService {
  wsData;
  codes = ['200', '201', '400', '401', '404', '500'];
  times = ['<50', '500>>50', '999>>500', '>1000'];

  constructor(private socket: Socket) { }

  requestResponses() {
    this.socket.emit('getResponses');
  }

  getResponses() {
    return this.socket.fromEvent('getResponses');
  }

  getCurrentPiceData(kind, pice) {
    switch (kind) {
      case 'times': {
        return this.getCurrentTimeData(pice);
      }
      case 'codes': {
        return this.getCurrentCodeData(pice);
      }
    }
  }

  getCurrentTimeData(time) {
    let minTime, maxTime;
    switch (time) {
      case this.times[0]: {
        minTime = 0;
        maxTime = 50;
        break;
      }
      case this.times[1]: {
        minTime = 50;
        maxTime = 500;
        break;
      }
      case this.times[2]: {
        minTime = 500;
        maxTime = 1000;
        break;
      }
      case this.times[3]: {
        minTime = 1000;
        maxTime = 10000;
        break;
      }
    }
    let timesPieData = [];
    this.codes.forEach(code => {
      let pieData = [];
      pieData.push(code);
      pieData.push(0);
      this.wsData.forEach(wsData => {
        wsData.responses.forEach(resp => {
          if (resp.code.toString() === code && (resp.time >= minTime && resp.time < maxTime))
            pieData[1]++;
        });
      })
      timesPieData.push(pieData);
    });
    return timesPieData;
  }

  getCurrentCodeData(code) {
    let timesPieData = [];
    this.times.forEach(time => {
      timesPieData.push([time, 0]);
    });
    this.wsData.forEach(wsData => {
      wsData.responses.forEach(resp => {
        if (resp.code == code)
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
    return timesPieData;
  }

  getCodesData() {
    let codesPieData = [];
    this.times.forEach(time => {
      codesPieData.push([time, 0]);
    });
    this.wsData.forEach(wsData => {
      wsData.responses.forEach(resp => {
        if (resp.time >= 1000)
          codesPieData[3][1]++;
        else if (resp.time >= 500)
          codesPieData[2][1]++;
        else if (resp.time >= 50)
          codesPieData[1][1]++;
        else
          codesPieData[0][1]++;
      });
    });
    return codesPieData;
  }

  getTimesData() {
    let timesPieData = [];
    this.codes.forEach(code => {
      let pieData = [];
      pieData.push(code);
      pieData.push(0);
      this.wsData.forEach(wsData => {
        wsData.responses.forEach(resp => {
          if (resp.code.toString() === code)
            pieData[1]++;
        });
      })
      timesPieData.push(pieData);
    });
    return timesPieData;
  }

}