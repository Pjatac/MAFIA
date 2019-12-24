import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class VmService {

  constructor(private socket: Socket) { }
  
  getAllServers(){
    return this.socket.fromEvent('getAllServers');
  }
}
