import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { JsonPipe } from '@angular/common';
import { format } from 'util';
import AuthService from '../services/auth.service'
import { MatDialog } from '@angular/material';
import { OurDialogComponent } from '../components/shared/our-dialog/our-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    userName: '',
    password: ''
  };

  constructor(private socket: Socket, private auth: AuthService, public dialog: MatDialog) { }

  postUser(user: User) {
  }

  login(authCredentials, cb) {
    this.socket.on('login-res', data => {
      this.auth.setToken(data.token);
      return cb(data);
    });

    this.socket.emit('login-request', authCredentials);
  }
  fb_login(fbData, cb) {
    this.socket.on('fb-login-res', data => {
      this.auth.setToken(data.token);
      return cb(data);
    });

    this.socket.emit('fb-login-request', fbData);
  }

  register(authCredentials) {
    this.socket.on('register-res', data => {
      this.dialog.open(OurDialogComponent, { data: { body: "Register status " + data, title: 'signup' } });
    });

    this.socket.emit('register-request', authCredentials);
  }

  getUserPayload() {
    var token = this.auth.getToken();
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
