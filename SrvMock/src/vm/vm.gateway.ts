import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Params } from '../models/vmparams';
import { WS } from 'src/models/ws';
import { MockData } from './vm.mock';

const vmsDataCount = 15;
const timeToAddCounter = 5;
let counter = 0;
const timeToSendVMsData = 10000;
let codes = ["200", "201", "400", "401", "404", "500"];

@WebSocketGateway()
export class VMGateway implements OnGatewayConnection, OnGatewayDisconnect {

    wsData = MockData.wsData;
    data = MockData.data;


    private timer: NodeJS.Timer;
    clients = [];
    

    @WebSocketServer() server;
    async handleConnection(client) {
        console.log("New Connectionn",this.clients.length);
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
        console.log("Disconnect ", client);
        this.clients = this.clients.filter(function (obj) {
            return obj.user.id !== client.id;   
        });
    }

    addResponse(time) {
        return { code: codes[Math.floor(Math.random() * codes.length)], time: Math.floor(Math.random() * time) }
    }

    @SubscribeMessage('getWsData')
    async onGetResponses(client) {
        this.generateWSresponses();
        client.emit('getWsData', this.wsData);
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
        //add new server after count from server start
        counter++;
        if (counter == timeToAddCounter)
            this.data.push(MockData.newSrv);
        //forming new data
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
        //sending new data to all connected clients by params
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
                        api.errs.push(currentDate);
                })
            })
        }
    }
}