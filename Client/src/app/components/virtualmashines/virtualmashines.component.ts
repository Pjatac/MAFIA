import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VmService } from 'src/app/services/vm.service';
import { Helper } from '../../helpers/helper';
import { SRV } from 'src/app/models/srv';
import { VMParams } from 'src/app/models/vmparams';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-virtualmashines',
  templateUrl: './virtualmashines.component.html',
  styleUrls: ['./virtualmashines.component.css']
})
export class VirtualmashinesComponent implements OnInit, OnDestroy {
  constructor(private vmService: VmService, public dialog: MatDialog, private auth: AuthService, private router: Router,
    private spinner: NgxSpinnerService) { }
  @Input() printMode: boolean;
  @Input() showCpu: boolean;
  @Input() showMemmory: boolean;


  serversData: SRV[];
  srvList: string[];
  cpuData;
  memData;
  newDataSubscribtion;
  period = 1;
  msTitle = "Servers";

  simpleSelectionTitle = "Period";
  periods = [
    { value: '1', viewValue: '1 minute' },
    { value: '5', viewValue: '5 minutes' },
    { value: '15', viewValue: '15 minutes' },
    { value: '30', viewValue: '30 minutes' },
    { value: '60', viewValue: '1 hour' }
  ];
  //data for filtring servers data on server side
  params: VMParams;

  ngOnInit() {
    this.spinner.show('vmspiner');
    this.auth.CheckTokenValidation();
    this.vmService.requestServers();
    this.vmService.getServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      if (!this.srvList) {
        this.srvList = Helper.getServersNames(servers);
        this.params = { period: this.period, servers: this.srvList };
      }
      this.buildChartData(servers);
    });
    this.newDataSubscribtion = this.vmService.getNewServersData().subscribe((servers: SRV[]) => {
      this.serversData = Helper.AddData(this.serversData, servers);
      this.buildChartData(this.serversData);
    });
  }

  changeSelection(servers) {
    this.spinner.show('vmspiner');
    this.params.servers = servers;
    this.vmService.requestServers(this.params);
  }

  changePeriod(period) {
    this.spinner.show('vmspiner');
    this.params.period = period;
    this.period = period;
    this.vmService.requestServers(this.params);
  }

  buildChartData(servers) {
    let chartData = Helper.BuildChartData(servers);
    this.cpuData = chartData.c;
    this.memData = chartData.m;
    this.spinner.hide('vmspiner');
  }

  ngOnDestroy() {
    this.newDataSubscribtion.unsubscribe();
  }
}