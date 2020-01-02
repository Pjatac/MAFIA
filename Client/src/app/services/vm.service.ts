import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export default class VmService {

  constructor(private socket: Socket) { }

  // requestFitredServers(servers){
  //   this.socket.emit('requestFiltredServers', servers);
  // }
  // getFitredServers(){
  //   return this.socket.fromEvent('getFiltredServers');
  // }

  // requestAllServers(){
  //   return this.socket.emit('getAllServers');
  // }

  // getAllServers(){
  //   return this.socket.fromEvent('getAllServers');
  // }

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