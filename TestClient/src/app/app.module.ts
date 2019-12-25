import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule} from './material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MydialogComponent } from './components/mydialog/mydialog.component';
import { CpuChartComponent } from './components/cpu-chart/cpu-chart.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultySelectComponent } from './components/multy-select/multy-select.component';
import { MemChartComponent } from './components/mem-chart/mem-chart.component';
import { VmComponent } from './components/vm/vm.component';
import { PeriodSelectComponent } from './components/period-select/period-select.component';
import VMService from '../app/services/vm.service';
import WSService from '../app/services/ws.service';
import { WsComponent } from './components/ws/ws.component';
import { RespPieChartComponent } from './components/resp-pie-chart/resp-pie-chart.component';
import { TimePieChartComponent } from './components/time-pie-chart/time-pie-chart.component';

const config: SocketIoConfig = { url: 'http://localhost:150', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    MydialogComponent,
    CpuChartComponent,
    MultySelectComponent,
    MemChartComponent,
    VmComponent,
    PeriodSelectComponent,
    WsComponent,
    RespPieChartComponent,
    TimePieChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [VMService, WSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
