// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import VmService from '../app/services/vm.service';
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
  MatDialogModule,
  MatSortModule,
  MatMenuModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSliderModule,
  MatNativeDateModule,
  MatDatepickerModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OurDialogComponent } from '../app/components/our-dialog/our-dialog.component';
import { MemChartComponent } from './components/virtualmashines/mem-chart/mem-chart.component';
import { CpuChartComponent } from './components/virtualmashines/cpu-chart/cpu-chart.component';
import { MultySelectComponent } from './components/virtualmashines/multy-select/multy-select.component';
import { PeriodSelectComponent } from './components/virtualmashines/period-select/period-select.component';

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
    MemChartComponent,
    CpuChartComponent,
    MultySelectComponent,
    PeriodSelectComponent,
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
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    UserService,
    VmService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, AuthGuard, UserService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent],
  entryComponents: [OurDialogComponent]
})
export class AppModule { }
