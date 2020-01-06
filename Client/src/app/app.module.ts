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
import ErrService from '../app/services/err.service';
import VmService from '../app/services/vm.service';
import TrService from '../app/services/tr.service';
import AuthService from './services/auth.service';
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
import { OurDialogComponent } from './components/shared/our-dialog/our-dialog.component';
import { MemChartComponent } from './components/virtualmashines/mem-chart/mem-chart.component';
import { CpuChartComponent } from './components/virtualmashines/cpu-chart/cpu-chart.component';
import { MultySelectComponent } from './components/shared/multy-select/multy-select.component';
import { SimpleSelectComponent } from './components/shared/simple-select/simple-select.component';
import { TimesResponsesComponent } from './components/times-responses/times-responses.component';
import { RespPieChartComponent } from './components/times-responses/resp-pie-chart/resp-pie-chart.component';
import { TimePieChartComponent } from './components/times-responses/time-pie-chart/time-pie-chart.component';
import { PieChartDialogComponent } from './components/times-responses/pie-chart-dialog/pie-chart-dialog.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { OurDataPickerComponent } from './components/errors/our-data-picker/our-data-picker.component';
import { RangeSliderComponent } from './components/errors/range-slider/range-slider.component';
import { Ng5SliderModule } from 'ng5-slider';

const ioConfig: SocketIoConfig = { url: 'localhost:100', options: {} };//http://91.205.172.45


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
    NavigationBarComponent,
    NavigationBarLinkComponent,
    OurDialogComponent,
    NavigationBarComponent,
    NavigationBarLinkComponent,
    MemChartComponent,
    CpuChartComponent,
    MultySelectComponent,
    SimpleSelectComponent,
    TimesResponsesComponent,
    RespPieChartComponent,
    TimePieChartComponent,
    PieChartDialogComponent,
    ErrorsComponent,
    OurDataPickerComponent,
    RangeSliderComponent,
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
    ReactiveFormsModule,
    Ng5SliderModule
  ],
  providers: [
    AuthGuard,
    UserService,
    VmService,
    TrService,
    AuthService,
    ErrService,
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
  entryComponents: [OurDialogComponent, PieChartDialogComponent]
})
export class AppModule {
 }
