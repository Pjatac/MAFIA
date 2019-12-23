import { Component, OnInit } from '@angular/core';
import { SRV } from 'src/app/models/srv';
import { Helper } from 'src/app/middleware/helper';
import { VMService } from 'src/app/services/vm.service';
import { Params } from 'src/app/models/vmparams';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit {

  constructor(private vmService: VMService) { }
  serversData: SRV[];
  srvList: string[];
  cpuData;
  memData;
  period = 1;
  //data for filtring servers on server side
  params: Params;

  ngOnInit() {
    this.vmService.getAllServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      this.srvList = Helper.getServers(servers);
      let chartData = Helper.BuildChartData(servers);
      this.params = {period: this.period, servers: this.srvList};
      this.cpuData = chartData.c;
      this.memData = chartData.m;
    });
    this.vmService.getNewServersData().subscribe((servers: SRV[]) => {
      this.serversData = Helper.AddData(this.serversData, servers);
      let chartData = Helper.BuildChartData(this.serversData);
      this.cpuData = chartData.c;
      this.memData = chartData.m;
    });
  }
  changeSelection(servers) {
    this.params.servers = servers;
    this.vmService.requestFitredServers(this.params);
    this.vmService.getFitredServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      let chartData = Helper.BuildChartData(servers);
      this.cpuData = chartData.c;
      this.memData = chartData.m;
    });
  }
  changePeriod(period) {
    this.params.period = period;
    this.period = period;
    this.vmService.requestFitredServers(this.params);
    this.vmService.getFitredServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      let chartData = Helper.BuildChartData(servers);
      this.cpuData = chartData.c;
      this.memData = chartData.m;
    });
  }
}
