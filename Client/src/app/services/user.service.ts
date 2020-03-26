import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';
import { AuthService } from './auth.service'
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

  login(authCredentials, cb) {
    this.socket.on('login-res', data => {
      if (data.token) this.auth.setToken(data.token);
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
      if (data)
        this.dialog.open(OurDialogComponent, { panelClass: 'custom-dialog-container', data: { body: "Your registration was success!", title: 'Signup' } });
      else
        this.dialog.open(OurDialogComponent, { panelClass: 'custom-dialog-container', data: { body: "Sorry, user with such name already exist", title: 'Signup' } });
    });
    this.socket.emit('register-request', authCredentials);
  }
}
