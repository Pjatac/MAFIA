import { Component, OnInit } from '@angular/core';
import { SRV } from 'src/app/models/srv';
import { Helper } from 'src/app/middleware/helper';
import { VMService } from 'src/app/services/vm.service';

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
  //data for filtring servers on server side
  params = [];

  ngOnInit() {
    this.vmService.getAllServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      this.srvList = Helper.getServers(servers);
      let chartData = Helper.BuildChartData(servers);
      this.cpuData = chartData.c;
      this.memData = chartData.m;
    });
    this.vmService.getNewServersData().subscribe((servers: SRV[]) => {
      let chartData = Helper.BuildChartData(servers);
      this.cpuData = chartData.c;
      this.memData = chartData.m;
      //let tmp = Helper.AddData(this.serversData, servers);
      //this.cpuData = chartData.c;
      //this.memData = chartData.m;
    });
  }
  changeSelection(servers) {
    this.vmService.requestFitredServers(servers);
    this.vmService.getFitredServers().subscribe((servers: SRV[]) => {
      this.serversData = servers;
      let chartData = Helper.BuildChartData(servers);
      this.cpuData = chartData.c;
      this.memData = chartData.m;
    });
  }
}
