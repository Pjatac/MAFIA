import { Component, OnInit } from '@angular/core';
import VmService from 'src/app/services/vm.service';
import { Helper } from '../../middleware/helper';
import { SRV } from 'src/app/models/srv';
import { Params } from 'src/app/models/vmparams';
import { MatDialog } from '@angular/material';
import { OurDialogComponent } from '../our-dialog/our-dialog.component';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-virtualmashines',
  templateUrl: './virtualmashines.component.html',
  styleUrls: ['./virtualmashines.component.css']
})
export class VirtualmashinesComponent implements OnInit {
  constructor(private vmService: VmService, public dialog: MatDialog, private auth: AuthService) { }

  serversData: SRV[];
  srvList: string[];
  cpuData;
  memData;
  period = 1;
  //data for filtring servers data on server side
  params: Params;

  ngOnInit() {
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
    this.vmService.getNewServersData().subscribe((servers: SRV[]) => {
      this.serversData = Helper.AddData(this.serversData, servers);
      this.buildChartData(this.serversData);
    });
  }
  changeSelection(servers) {
    this.params.servers = servers;
    this.vmService.requestServers(this.params);
  }
  changePeriod(period) {
    this.params.period = period;
    this.period = period;
    this.vmService.requestServers(this.params);
  }

  buildChartData(servers) {
    let chartData = Helper.BuildChartData(servers);
    this.cpuData = chartData.c;
    this.memData = chartData.m;
  }
}