import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService) { }
  model = {
    username: '',
    password: ''
  };
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.register(form.value);
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      userName: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
