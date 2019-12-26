import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  model = {
    username: '',
    password: ''
  };

  serverErrorMessages: string;

  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/virtual-mashines');
  }

  onSubmit(form: NgForm) {

    let data = this.userService.login(form.value, (data) => {
      if (data.status) {
        this.router.navigateByUrl('/virtual-mashines');

      }
      else {
        alert('Could not login!');
      }
    });

  }
}
