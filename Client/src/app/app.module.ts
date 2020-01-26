// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import { ExportAsModule } from 'ngx-export-as';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxSpinnerModule } from "ngx-spinner";
import { TreeviewModule } from 'ngx-treeview';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { NavigationBarComponent } from './components/common_elements/navigation_bar/navigation_bar.component';
import { NavigationBarLinkComponent } from './components/common_elements/navigation_bar/navigation_bar_link/navigation_bar_link.component';
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
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { TreeComponent } from './components/shared/tree/tree.component';
import { VirtualmashinesComponent } from './components/virtualmashines/virtualmashines.component';
// routes
import { appRoutes } from './routes';
//services
import { UserService } from './services/user.service';
import ErrService from '../app/services/err.service';
import VmService from '../app/services/vm.service';
import TrService from '../app/services/tr.service';
import AuthService from './services/auth.service';
import ScreenshotService from './services/screenshot.service';
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
  MatChipsModule
} from '@angular/material';



const ioConfig: SocketIoConfig = { url: 'http://localhost:100', options: {} };//http://91.205.172.45
//try to add SSL connection
//{ url: 'https://localhost:3003', options: {transports: ['websocket'],secure: true} }

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
    PrintLayoutComponent,
    TreeComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
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
    Ng5SliderModule,
    AngularMultiSelectModule,
    ExportAsModule,
    MatChipsModule,
    NgxSpinnerModule,
    TreeviewModule.forRoot()
  ],
  providers: [
    UserService,
    VmService,
    TrService,
    AuthService,
    ErrService,
    ScreenshotService,
    UserService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent],
  entryComponents: [OurDialogComponent, PieChartDialogComponent]
})
export class AppModule {
 }
