// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
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
  MatCardModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    VirtualmashinesComponent
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
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
    AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }