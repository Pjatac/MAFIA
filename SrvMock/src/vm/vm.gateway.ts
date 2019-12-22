import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { threadId } from 'worker_threads';

@WebSocketGateway()
export class VMGateway implements OnGatewayConnection, OnGatewayDisconnect {

    private timer: NodeJS.Timer;
    clients = [];
    data = [
        {
            name: 'Srv1', vms: [{
                name: "vm1",
                data: [{ cpuUsage: 100, memUsage: 25 },
                { cpuUsage: 95, memUsage: 35 },
                { cpuUsage: 55, memUsage: 45 }
                ]
            },
            {
                name: "vm2",
                data: [{ cpuUsage: 50, memUsage: 45 },
                { cpuUsage: 55, memUsage: 45 },
                { cpuUsage: 70, memUsage: 60 }
                ]
            }
            ]
        },
        {
            name: 'Srv2', vms: [{
                name: "vm1",
                data: [{ cpuUsage: 20, memUsage: 35 },
                { cpuUsage: 25, memUsage: 45 },
                { cpuUsage: 75, memUsage: 80 }
                ]
            },
            {
                name: "vm2",
                data: [{ cpuUsage: 99, memUsage: 75 },
                { cpuUsage: 90, memUsage: 70 },
                { cpuUsage: 95, memUsage: 30 }
                ]
            }
            ]
        }
    ];
    @WebSocketServer() server;
    async handleConnection(client) {
        this.clients.push({ user: client, dataType: [] });
        let data;
        let tmp = this.data[0].vms[0].data.length;
        if (tmp <= 15)
            data = this.getVMsByFilter(this.data, []);
        else {
            data = [];
            this.data.forEach(srv => {
                 let vms = [];
                 srv.vms.forEach(vm => {
                     vms.push({name: vm.name, data: vm.data.slice(-15)});
                 });
                 data.push({name: srv.name, vms: vms});
             });
            data = this.getVMsByFilter(data, []);
        }
        client.emit('getAllServers', data);
        this.timer = global.setInterval(() => this.myTimer(), 2000);
    }

    async handleDisconnect(client) {
        this.clients = this.clients.filter(function (obj) {
            return obj.user.id !== client.id;
        });
    }

    @SubscribeMessage('requestFiltredServers')
    async onNewFilter(client, dataType: []) {
        //let data = this.getVMsByFilter(this.data, dataType);
        let data;
        let tmp = this.data[0].vms[0].data.length;
        if (tmp <= 15)
            data = this.getVMsByFilter(this.data, dataType);
        else {
            data = [];
            this.data.forEach(srv => {
                 let vms = [];
                 srv.vms.forEach(vm => {
                     vms.push({name: vm.name, data: vm.data.slice(-15)});
                 });
                 data.push({name: srv.name, vms: vms});
             });
            data = this.getVMsByFilter(data, dataType);
        }
        this.clients.forEach(cl => {
            if (cl.user.id === client.id)
                cl.dataType = dataType;
        });
        client.emit('getFiltredServers', data);
    }

    getVMsByFilter(data, dataFilter: []) {
        if (dataFilter.length > 0) {
            let toSend = [];
            dataFilter.forEach(srvName => {
                toSend.push(data.filter(function (obj) {
                    return obj.name == srvName;
                })[0]);
            });
            return toSend;
        }
        else
            return data;
    };


    public async myTimer() {
        let newData = [];
        this.data.forEach(srv => {
            let vmNewData = [];
            srv.vms.forEach(vm => {
                let change = Math.floor(Math.random() * 6) + 10;
                let cpuGrowth = (Math.random() > 0.5);
                let memGrowth = (Math.random() > 0.5);
                let lastCpuUsage = vm.data[vm.data.length - 1].cpuUsage;
                let lastMemUsage = vm.data[vm.data.length - 1].memUsage;
                if (cpuGrowth && memGrowth) {
                    if (lastCpuUsage + change <= 100 && lastMemUsage + change <= 100)
                        vm.data.push({ cpuUsage: lastCpuUsage + change, memUsage: lastMemUsage + change });
                    else if (lastCpuUsage + change <= 100 && !(lastMemUsage + change <= 100))
                        vm.data.push({ cpuUsage: lastCpuUsage + change, memUsage: lastMemUsage });
                    else if (!(lastCpuUsage + change <= 100) && lastMemUsage + change <= 100)
                        vm.data.push({ cpuUsage: lastCpuUsage, memUsage: lastMemUsage + change });
                }
                else if (cpuGrowth && !memGrowth) {
                    if (lastCpuUsage + change <= 100 && lastMemUsage - change >= 0)
                        vm.data.push({ cpuUsage: lastCpuUsage + change, memUsage: lastMemUsage - change });
                    else if (lastCpuUsage + change <= 100 && !(lastMemUsage - change >= 0))
                        vm.data.push({ cpuUsage: lastCpuUsage + change, memUsage: lastMemUsage });
                    else if (!(lastCpuUsage + change <= 100) && lastMemUsage - change >= 0)
                        vm.data.push({ cpuUsage: lastCpuUsage, memUsage: lastMemUsage - change });
                }
                else if (!cpuGrowth && memGrowth) {
                    if (lastCpuUsage - change >= 0 && lastMemUsage + change <= 100)
                        vm.data.push({ cpuUsage: lastCpuUsage - change, memUsage: lastMemUsage + change });
                    else if (lastCpuUsage - change >= 0 && !(lastMemUsage + change <= 100))
                        vm.data.push({ cpuUsage: lastCpuUsage - change, memUsage: lastMemUsage });
                    else if (!(lastCpuUsage - change >= 0) && lastMemUsage + change <= 100)
                        vm.data.push({ cpuUsage: lastCpuUsage, memUsage: lastMemUsage + change });
                }
                else if (!cpuGrowth && !memGrowth) {
                    if (lastCpuUsage - change >= 0 && lastMemUsage + change >= 0)
                        vm.data.push({ cpuUsage: lastCpuUsage - change, memUsage: lastMemUsage - change });
                    else if (lastCpuUsage - change >= 0 && !(lastMemUsage - change >= 0))
                        vm.data.push({ cpuUsage: lastCpuUsage - change, memUsage: lastMemUsage });
                    else if (!(lastCpuUsage - change >= 0) && lastMemUsage - change >= 0)
                        vm.data.push({ cpuUsage: lastCpuUsage, memUsage: lastMemUsage - change });
                }
                vmNewData.push({name: vm.name, data: [{ cpuUsage: vm.data[vm.data.length - 1].cpuUsage, memUsage: vm.data[vm.data.length - 1].memUsage }]});
            });
            newData.push({name: srv.name, vms: vmNewData});
        });

        this.clients.forEach(c => {
            let data = this.getVMsByFilter(newData, c.dataType);
            c.user.emit('getNewServersData', data);
        });
    }
}