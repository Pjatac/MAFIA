import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export default class VmService {

  constructor(private socket: Socket) { }

  requestServers(params?:  Params) {
    return this.socket.emit('getServers', params);
  }

  getServers() {
    return this.socket.fromEvent('getServers');
  }

  getNewServersData() {
    return this.socket.fromEvent('getNewServersData');
  }
}