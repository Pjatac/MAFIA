import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Params } from '../models/vmparams';
import { WS } from 'src/models/ws';

const vmsDataCount = 15;
const timeToAddCounter = 5;
let counter = 0;
<<<<<<< HEAD
const timeToSendVMsData = 10000;
=======
const timeToSendVMsData = 40000;
>>>>>>> PjatakBranch
let codes = ["200", "201", "400", "401", "404", "500"];

@WebSocketGateway()
export class VMGateway implements OnGatewayConnection, OnGatewayDisconnect {

    wsData = [{ name: "AuthMng", responses: [], apis: [{ name: "LogIn", errors: [] }, { name: "LogOut", errors: [] }] },
    { name: "ClientMng", responses: [], apis: [{ name: "Create", errors: [] }, { name: "Edit", errors: [] }, { name: "Del", errors: [] }] },
    { name: "MailMng", responses: [], apis: [{ name: "Send", errors: [] }, { name: "Check", errors: [] }] },
    { name: "Analitic", responses: [], apis: [{ name: "GetAll", errors: [] }, { name: "GetErr", errors: [] }, { name: "GetServ", errors: [] }, { name: "GetResp", errors: [] }] }];
    private timer: NodeJS.Timer;
    clients = [];
    data = [
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

    @WebSocketServer() server;
    async handleConnection(client) {
<<<<<<< HEAD
        console.log("New Connectionn",this.clients.length);
=======
        console.log("New Connection",this.clients.length);
>>>>>>> PjatakBranch
        let params = new Params(1, [])
        this.clients.push({ user: client, params: params });
        let data;
        //need to check max length, not first
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
        //start sending VMs data
        this.timer = global.setInterval(() => this.sendVMsData(), timeToSendVMsData);
    }

    async handleDisconnect(client) {
        this.clients = this.clients.filter(function (obj) {
<<<<<<< HEAD
            console.log(this.clients.length);
=======
            console.log("New Connection",this.clients.length);
>>>>>>> PjatakBranch
            return obj.user.id !== client.id;
            
        });
    }

    addResponse(time) {
        return { code: codes[Math.floor(Math.random() * codes.length)], time: Math.floor(Math.random() * time) }
    }

    @SubscribeMessage('getResponses')
    async onGetResponses(client) {
        this.generateWSresponses();
        client.emit('getResponses', this.wsData);
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

    generateNewUsage(oldUsage) {
        let change = Math.floor(Math.random() * 6) + 10;
        let growth = (Math.random() > 0.5);
        if (growth)
            oldUsage += change;
        else
            oldUsage -= change;
        return Math.max(Math.min(oldUsage, 100), 0);
    }

    public async sendVMsData() {
        //need to short
        counter++;
        if (counter == timeToAddCounter)
            this.data.push({
                name: 'Srv4', vms: [
                    { name: "vm3", data: [{ cpuUsage: 33, memUsage: 15 }, { cpuUsage: 15, memUsage: 22 }, { cpuUsage: 75, memUsage: 45 }] },
                    { name: "vm5", data: [{ cpuUsage: 41, memUsage: 39 }, { cpuUsage: 55, memUsage: 44 }, { cpuUsage: 75, memUsage: 70 }] }
                ]
            });
        let newData = [];
        this.data.forEach(srv => {
            let vmNewData = [];
            srv.vms.forEach(vm => {
                let lastCpuUsage = vm.data[vm.data.length - 1].cpuUsage;
                let lastMemUsage = vm.data[vm.data.length - 1].memUsage;
                vm.data.push({ cpuUsage: this.generateNewUsage(lastCpuUsage), memUsage: this.generateNewUsage(lastMemUsage) });
                vmNewData.push({ name: vm.name, data: [{ cpuUsage: vm.data[vm.data.length - 1].cpuUsage, memUsage: vm.data[vm.data.length - 1].memUsage }] });
            });
            newData.push({ name: srv.name, vms: vmNewData });
        });
        this.clients.forEach(c => {
            let data = this.getVMsByFilter(newData, c.params);
            c.user.emit('getNewServersData', data);
            console.log("Sent");
        });
       
        
    }
    generateWSresponses() {
        this.generateWSerrors();
        for (let i = 0; i < 1000; i++)
            this.wsData.forEach(ws => {
                let req = (Math.random() > 0.5);
                if (req) {
                    let kind = Math.floor(Math.random() * 5);
                    switch (kind) {
                        case 1: {
                            ws.responses.push(this.addResponse(50));
                            break;
                        }
                        case 2: {
                            ws.responses.push(this.addResponse(500));
                            break;
                        }
                        case 3: {
                            ws.responses.push(this.addResponse(1000));
                            break;
                        }
                        case 4: {
                            ws.responses.push(this.addResponse(2000));
                            break;
                        }
                    }
                }
            });
    }

    generateWSerrors() {
        let endDate = new Date();
        let startDate = new Date();
        startDate.setHours(startDate.getHours() - 24);
        //Fill by  10 seconds
        for (let currentDate = startDate; currentDate < endDate; currentDate.setSeconds(currentDate.getSeconds() + 10)) {
            this.wsData.forEach(ws => {
                ws.apis.forEach( api => {
                    if (Math.random() > 0.9)
                        api.errors.push(currentDate);
                })
            })
        }
    }
}