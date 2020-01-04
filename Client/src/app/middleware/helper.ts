import { SRV } from '../models/srv';

export class Helper {

    static addResponse(time, codes) {
        return { code: codes[Math.floor(Math.random() * codes.length)], time: Math.floor(Math.random() * time) }
    }

    static getWSData() {
        let codes = ["200", "201", "400", "401", "404", "500"];
        let wsData = [{ name: "AuthMng", responses: [], apis: [{ name: "LogIn", errors: [] }, { name: "LogOut", errors: [] }] },
        { name: "ClientMng", responses: [], apis: [{ name: "Create", errors: [] }, { name: "Edit", errors: [] }, { name: "Del", errors: [] }] },
        { name: "MailMng", responses: [], apis: [{ name: "Send", errors: [] }, { name: "Check", errors: [] }] },
        { name: "Analitic", responses: [], apis: [{ name: "GetAll", errors: [] }, { name: "GetErr", errors: [] }, { name: "GetServ", errors: [] }, { name: "GetResp", errors: [] }] }];
        for (let i = 0; i < 1000; i++)
            wsData.forEach(ws => {
                let req = (Math.random() > 0.5);
                if (req) {
                    let kind = Math.floor(Math.random() * 5);
                    switch (kind) {
                        case 1: {
                            ws.responses.push(this.addResponse(50, codes));
                            break;
                        }
                        case 2: {
                            ws.responses.push(this.addResponse(500, codes));
                            break;
                        }
                        case 3: {
                            ws.responses.push(this.addResponse(1000, codes));
                            break;
                        }
                        case 4: {
                            ws.responses.push(this.addResponse(2000, codes));
                            break;
                        }
                    }
                }
            });
        return wsData;
    }

    static getVMsData() {
        return [
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
    }
    static buildAxisXLabels(period) {
        let labels = ['x'];
        for (let i = 0; i < 16; i++) {
            labels.push((period * i).toString());
        }
        return labels;
    }
    static AddData(current: SRV[], newData) {
        if (current.length > 0) {
            if (current[0].vms[0].data.length < 16) {
                let srvCounter = 0;
                current.forEach(srv => {
                    let vmCounter = 0;
                    srv.vms.forEach(vm => {
                        let pos = newData[srvCounter].vms[vmCounter].data;
                        vm.data.push({ cpuUsage: pos.cpuUsage, memUsage: pos.memUsage });
                        vmCounter++;
                    });
                    srvCounter++;
                });
            }
            else {
                let srvCounter = 0;
                current.forEach(srv => {
                    let vmCounter = 0;
                    srv.vms.forEach(vm => {
                        let pos = newData[srvCounter].vms[vmCounter].data;
                        vm.data.splice(0, 1);
                        vm.data.push({ cpuUsage: pos.cpuUsage, memUsage: pos.memUsage });
                        vmCounter++;
                    });
                    srvCounter++;
                });
            }
            return current;
        }
        else
            return newData;
    }
    static BuildChartData(servers: SRV[]) {
        let chartsData = { c: [], m: [] };
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
    static getServersNames(servers: SRV[]) {
        let srvNames = [];
        servers.forEach(srv => {
            srvNames.push(srv.name);
        });
        return srvNames;
    }
}