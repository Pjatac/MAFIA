import { SRV } from '../models/srv';

export class Helper{
    static AddData(current: SRV[], newData: SRV[]){
        if (current[0].vms.length < 16){
            let counter = 0;
            current.forEach(srv => {
                //srv.c.push(newData.);
            });
        }
        else {

        }
    }
    static BuildChartData(servers: SRV[]){
        let chartsData = {c: [], m: []};
        let cpuData = [];
        let memData = [];
        servers.forEach(srv => {
            srv.vms.forEach(vm => {
                let mData = [];
                let cData = [];
                cData.push(`${srv.name}/${vm.name}`);
                mData.push(`${srv.name}/${vm.name}`);
                vm.data.forEach(d => {
                    cData.push(d.cpuUsage);
                    mData.push(d.memUsage);
                });
                cpuData.push(cData);
                memData.push(mData);
            });
        });
        chartsData.c = cpuData;
        chartsData.m = memData;
        return chartsData;
      }
      static getServers(servers: SRV[]) {
        let srvNames = [];
        servers.forEach(srv => {
            srvNames.push(srv.name);
            });
        return srvNames;
      }
}