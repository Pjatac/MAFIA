import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material';
import { OurDialogComponent } from '../../shared/our-dialog/our-dialog.component';
import { AuthService as FbAuth, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Output() status = new EventEmitter();
  
  //fb data
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, public dialog: MatDialog, private fbAuth: FbAuth) { }

  model = {
    username: '',
    password: ''
  };

  serverErrorMessages: string;

  ngOnInit() {
    this.authService.CheckTokenValidation();
    this.fbAuth.authState.subscribe((user) => {
      if (user) {
        let fbData = {fbID: user.id, email: user.email};
        let data = this.userService.fb_login(fbData, (data) => {
          this.dataProcessing(data);
        });
      }
    });
  }

  signInWithFB(): void {
    this.fbAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.fbAuth.signOut();
  }

  onSubmit(form: NgForm) {
    let data = this.userService.login(form.value, (data) => {
      this.dataProcessing(data);
    });

  }
  dataProcessing(data) {
    if (data.status) {
      this.status.emit();
      this.router.navigateByUrl('/virtual-mashines');
    }
    else {
      this.dialog.open(OurDialogComponent, { panelClass: 'custom-dialog-container', data: {body:data.err, title: 'title' }});
    }
  }
}
