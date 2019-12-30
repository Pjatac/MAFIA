import { Component, OnInit } from '@angular/core';
import VmService  from 'src/app/services/vm.service';
import { Helper } from '../../middleware/helper';
import { SRV } from 'src/app/models/srv';
import { Params } from 'src/app/models/vmparams';
import { MatDialog } from '@angular/material';
import { OurDialogComponent } from '../our-dialog/our-dialog.component';

@Component({
  selector: 'app-virtualmashines',
  templateUrl: './virtualmashines.component.html',
  styleUrls: ['./virtualmashines.component.css']
})
export class VirtualmashinesComponent implements OnInit {
  constructor(private vmService: VmService, public dialog: MatDialog) { }

  serversData: SRV[];
  srvList: string[];
  cpuData;
  memData;
  period = 1;
  //data for filtring servers data on server side
  params: Params;

  ngOnInit() {
    this.dialog.open(OurDialogComponent, { data: "Hello on our cluster analic service" });
    // this.vmService.getAllServers().subscribe((servers: SRV[]) => {
    //   this.serversData = servers;
    //   this.srvList = Helper.getServersNames(servers);
    //   this.params = { period: this.period, servers: this.srvList };
    //   this.buildChartData(servers);
    // });
    // this.vmService.getNewServersData().subscribe((servers: SRV[]) => {
    //   this.serversData = Helper.AddData(this.serversData, servers);
    //   this.buildChartData(this.serversData);
    // });
    this.serversData = [
      {
          name: 'Srv1', vms: [
              { name: "vm1", data: [{ cpuUsage: 100, memUsage: 25 }, { cpuUsage: 95, memUsage: 35 }, { cpuUsage: 55, memUsage: 45 }] },
              { name: "vm2", data: [{ cpuUsage: 50, memUsage: 45 }, { cpuUsage: 55, memUsage: 45 }, { cpuUsage: 70, memUsage: 60 }] }
          ]
      },
      {
          name: 'Srv2', vms: [
              { name: "vm1", data: [{ cpuUsage: 20, memUsage: 35 }, { cpuUsage: 25, memUsage: 45 }, { cpuUsage: 75, memUsage: 80 }] },
              { name: "vm2", data: [{ cpuUsage: 99, memUsage: 75 }, { cpuUsage: 90, memUsage: 70 }, { cpuUsage: 95, memUsage: 30 }] }
          ]
      },
      {
          name: 'Srv3', vms: [
              { name: "vm1", data: [{ cpuUsage: 33, memUsage: 15 }, { cpuUsage: 75, memUsage: 45 }, { cpuUsage: 15, memUsage: 22 }] },
              { name: "vm2", data: [{ cpuUsage: 39, memUsage: 41 }, { cpuUsage: 75, memUsage: 70 }, { cpuUsage: 55, memUsage: 44 }] }
          ]
      }
  ];
  this.srvList = Helper.getServersNames(this.serversData);
  this.buildChartData(this.serversData);
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