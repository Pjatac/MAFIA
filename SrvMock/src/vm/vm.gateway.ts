import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { threadId } from 'worker_threads';
import { Params } from '../models/vmparams';
import { WS, WSResponse } from '../models/ws';
const vmsDataCount = 15;
const timeToAddCounter = 5;
let counter = 0;
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
        },
        {
            name: 'Srv3', vms: [{
                name: "vm1",
                data: [{ cpuUsage: 33, memUsage: 15 },
                { cpuUsage: 75, memUsage: 45 },
                { cpuUsage: 15, memUsage: 22 }
                ]
            },
            {
                name: "vm2",
                data: [{ cpuUsage: 39, memUsage: 41 },
                { cpuUsage: 75, memUsage: 70 },
                { cpuUsage: 55, memUsage: 44 }
                ]
            }
            ]
        }
    ];
    @WebSocketServer() server;
    async handleConnection(client) {
        //change tmp name,  and const
        let params = new Params(1, [])
        this.clients.push({ user: client, params: params });
        let data;
        let dataLength = this.data[0].vms[0].data.length;
        if (dataLength <= vmsDataCount)
            data = this.getVMsByFilter(this.data, params);
        else {
            data = [];
            this.data.forEach(srv => {
                let vms = [];
                srv.vms.forEach(vm => {
                    vms.push({ name: vm.name, data: vm.data.slice(-vmsDataCount) });
                });
                data.push({ name: srv.name, vms: vms });
            });
            data = this.getVMsByFilter(data, params);
        }
        client.emit('getAllServers', data);
        this.timer = global.setInterval(() => this.myTimer(), 5000);
    }


    async handleDisconnect(client) {
        this.clients = this.clients.filter(function (obj) {
            return obj.user.id !== client.id;
        });
    }

    @SubscribeMessage('getResponses')
    async onGetResponses(client) {
        let codes = ["200", "201", "400", "401", "404", "500"];
        let wsData = [{ name: "ws1", responses: [] }, { name: "ws2", responses: [] }, { name: "ws3", responses: [] }, { name: "ws4", responses: [] }];
        for (let i = 0; i < 1000; i++)
            wsData.forEach(ws => {
                let req = (Math.random() > 0.5);
                if (req) {
                    let kind = Math.floor(Math.random() * 5);
                    switch (kind){
                        case 1: {
                            ws.responses.push({ code: codes[Math.floor(Math.random() * 6)], time: Math.floor(Math.random() * 50) });
                            break;
                        }
                        case 2: {
                            ws.responses.push({ code: codes[Math.floor(Math.random() * 6)], time: Math.floor(Math.random() * 500) });
                            break;
                        }
                        case 3: {
                            ws.responses.push({ code: codes[Math.floor(Math.random() * 6)], time: Math.floor(Math.random() * 1000) });
                            break;
                        }
                        case 4: {
                            ws.responses.push({ code: codes[Math.floor(Math.random() * 6)], time: Math.floor(Math.random() * 2000) });
                            break;
                        }
                    }
                }
            });
        client.emit('getResponses', wsData);
    }

    @SubscribeMessage('requestFiltredServers')
    async onNewFilter(client, params: Params) {
        let data;
        let dataLength = this.data[0].vms[0].data.length;
        if (dataLength <= vmsDataCount)
            data = this.getVMsByFilter(this.data, params);
        else {
            data = [];
            this.data.forEach(srv => {
                let vms = [];
                srv.vms.forEach(vm => {
                    vms.push({ name: vm.name, data: vm.data.slice(-vmsDataCount) });
                });
                data.push({ name: srv.name, vms: vms });
            });
            data = this.getVMsByFilter(data, params);
        }
        this.clients.forEach(cl => {
            if (cl.user.id === client.id)
                cl.params = params;
        });
        client.emit('getFiltredServers', data);
    }

    getVMsByFilter(data, dataFilter: Params) {
        if (dataFilter.servers.length > 0) {
            let toSend = [];
            dataFilter.servers.forEach(srvName => {
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
        //short
        counter++;
        if (counter == timeToAddCounter)
            this.data.push({
                name: 'Srv4', vms: [{
                    name: "vm3",
                    data: [{ cpuUsage: 33, memUsage: 15 },
                    { cpuUsage: 15, memUsage: 22 },
                    { cpuUsage: 75, memUsage: 45 }
                    ]
                },
                {
                    name: "vm5",
                    data: [{ cpuUsage: 41, memUsage: 39 },
                    { cpuUsage: 55, memUsage: 44 },
                    { cpuUsage: 75, memUsage: 70 }
                    ]
                }
                ]
            });
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
                vmNewData.push({ name: vm.name, data: [{ cpuUsage: vm.data[vm.data.length - 1].cpuUsage, memUsage: vm.data[vm.data.length - 1].memUsage }] });
            });
            newData.push({ name: srv.name, vms: vmNewData });
        });
        this.clients.forEach(c => {
            let data = this.getVMsByFilter(newData, c.params);
            c.user.emit('getNewServersData', data);
        });
    }
}