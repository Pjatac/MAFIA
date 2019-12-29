// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { NavigationBarComponent } from './components/common_elements/navigation_bar/navigation_bar.component';
import { NavigationBarLinkComponent } from './components/common_elements/navigation_bar/navigation_bar_link/navigation_bar_link.component';
// routes
import { appRoutes } from './routes';
import { UserService } from './shared/user.service';
// other
//other
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { VirtualmashinesComponent } from './components/virtualmashines/virtualmashines.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//Material
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OurDialogComponent } from '../app/components/our-dialog/our-dialog.component';

const ioConfig: SocketIoConfig = { url: 'http://91.205.172.45:100', options: {} };
const authConfig = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1008444119539924')
  }
]);

export function provideConfig() {
  return authConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    VirtualmashinesComponent,
    OurDialogComponent,
    NavigationBarComponent,
    NavigationBarLinkComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SocketIoModule.forRoot(ioConfig),
    SocialLoginModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService,
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
    AuthGuard, UserService],
  bootstrap: [AppComponent],
  entryComponents: [OurDialogComponent]
})
export class AppModule { }
