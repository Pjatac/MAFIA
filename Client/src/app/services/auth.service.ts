import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  

  constructor(private router: Router) { }

  getToken(){
    return sessionStorage.getItem('token');
  }

  setToken(token: string){
    sessionStorage.setItem('token', token);
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }

  CheckTokenValidation(){
    const token = this.getToken();
    if(!token)
      this.router.navigateByUrl('/');
    else {
      //check with server
    }  
  }
}