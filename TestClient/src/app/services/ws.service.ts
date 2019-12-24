import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export default class VMService {

  constructor(private socket: Socket) { }
  requestResponses(){
    this.socket.emit('getResponses');
  }
  getResponses(){
    return this.socket.fromEvent('getResponses');
  }
}