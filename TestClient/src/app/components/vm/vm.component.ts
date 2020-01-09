import { Component, OnInit } from '@angular/core';
import { SRV } from 'src/app/models/srv';
import { Helper } from 'src/app/middleware/helper';
import  { VMService } from '../../services/vm.service';
import { Params } from 'src/app/models/vmparams';
import { MatDialog } from '@angular/material';
import { MydialogComponent } from '../mydialog/mydialog.component';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit {

  constructor(private vmService: VMService, public dialog: MatDialog) { }
  serversData: SRV[];
  srvList: string[];
  cpuData;
  memData;
  period = 1;
  //data for filtring servers data on server side
  params: Params;

  ngOnInit() {
    this.dialog.open(MydialogComponent, {panelClass: 'custom-dialog-container', data: "Hello on our cluster analic service" });
    this.vmService.getAllServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      this.srvList = Helper.getServers(servers);
      this.params = { period: this.period, servers: this.srvList };
      this.buildChartData(servers);
    });
    this.vmService.getNewServersData().subscribe((servers: SRV[]) => {
      this.serversData = Helper.AddData(this.serversData, servers);
      this.buildChartData(this.serversData);
    });
  }
  changeSelection(servers) {
    this.params.servers = servers;
    this.vmService.requestFitredServers(this.params);
    this.vmService.getFitredServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      this.buildChartData(servers);
    });
  }
  changePeriod(period) {
    this.params.period = period;
    this.period = period;
    this.vmService.requestFitredServers(this.params);
    this.vmService.getFitredServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      this.buildChartData(servers);
    });
  }

  buildChartData(servers) {
    let chartData = Helper.BuildChartData(servers);
    this.cpuData = chartData.c;
    this.memData = chartData.m;
  }
}
