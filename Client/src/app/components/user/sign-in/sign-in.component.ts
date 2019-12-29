import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../../shared/user.service';
import { MatDialog } from '@angular/material';
import { OurDialogComponent } from '../../our-dialog/our-dialog.component';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog, private authService: AuthService) { }

  model = {
    username: '',
    password: ''
  };

  serverErrorMessages: string;

  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/virtual-mashines');
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.loggedIn = (user != null);
        this.dialog.open(OurDialogComponent, { data: `Welcome, ${this.user.name}` });
        this.router.navigateByUrl('/virtual-mashines');
      }
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  onSubmit(form: NgForm) {

    let data = this.userService.login(form.value, (data) => {
      if (data.status) {
        this.router.navigateByUrl('/virtual-mashines');
      }
      else {
        this.dialog.open(OurDialogComponent, { data: data.err });
      }
    });
    //this.signInWithFB();

  }
}
