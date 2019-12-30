import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { JsonPipe } from '@angular/common';
import { format } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    userName: '',
    password: ''
  };

  constructor(private socket: Socket) { }

  postUser(user: User) {
  }

  login(authCredentials,cb) {
    this.socket.on('login-res', data => {
      sessionStorage.setItem('token', data.token);
      return cb(data);
    });

    this.socket.emit('login-request', authCredentials);
  }
  fb_login(fbData, cb) {
    this.socket.on('fb-login-res', data => {
      sessionStorage.setItem('token', data.token);
      return cb(data);
    });

    this.socket.emit('fb-login-request', fbData);
  }

  register(authCredentials) {
    this.socket.on('register-res', data => {
      alert("Register status " + data);
    });

    this.socket.emit('register-request', authCredentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
