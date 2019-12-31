import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  constructor(private router: Router) { }
  checkLogedIn() {
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  onRouterActivate() {
    if(!sessionStorage.getItem('token'))
    this.router.navigateByUrl('/');
  }
}

