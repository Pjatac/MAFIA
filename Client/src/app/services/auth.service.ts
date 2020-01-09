import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export default class AuthService {


  constructor(private router: Router, private socket: Socket) { }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  CheckTokenValidation() {
    const token = this.getToken();
    if (!token)
      this.router.navigateByUrl('/');
    else {
      this.requestCheckToken();
      this.getCheckToken().subscribe((validation) => {
        if (!validation) {
          this.removeToken();
          this.router.navigateByUrl('/');
        }
      });
    }
  }

  requestCheckToken() {
    this.socket.emit('check-token', sessionStorage.getItem('token'));
  }

  getCheckToken() {
    return this.socket.fromEvent('checkToken');
  }
}