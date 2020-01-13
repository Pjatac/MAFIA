import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Params } from '../models/vmparams';
import { MockData } from './vm.mock';

const vmsDataCount = 15;
let counter = 0;
const timeToAddCounter = 5;//add new Server after timeToSendData*timeToAddCounter
const minUsage = 0;
const maxUsage = 100;
const responsesCountToGenerate = 1000;
const respFirstLimit = 50;
const respSecondLimit = 500;
const respThirdLimit = 1000;
const respFourthLimit = 2000;
const errorGenerateLevel = 0.9;//from 0 to 1 between errorGenerateLevel and 1
const errorGenerateStap = 5000;//in ms
const timeToSendVMsData = 60000;
const codes = ["200", "201", "400", "401", "404", "500"];

@WebSocketGateway()
export class VMGateway implements OnGatewayConnection, OnGatewayDisconnect {

    wsData = MockData.wsData;
    data = MockData.vmData;
    lastSendOfWS = new Date();

    private timer: NodeJS.Timer;
    clients = [];


    @WebSocketServer() server;
    async handleConnection(client) {
        console.log("New Connectionn", this.clients.length);
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
        this.clients.splice(this.clients.indexOf(cl => cl.user.id = client.id), 1);
    }

    @SubscribeMessage('getWsData')
    async onGetResponses(client) {
        //generate WSs data
        this.generateWSresponses();
        this.generateWSerrors();
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
        let change = this.getRandomInt(6) + 10;
        let growth = this.getRandomYesNo();
        if (growth)
            oldUsage += change;
        else
            oldUsage -= change;
        return Math.max(Math.min(oldUsage, maxUsage), minUsage);
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
        console.log(`Send new VMs data on ${new Date()}`);
        this.clients.forEach(c => {
            let data = this.getVMsByFilter(newData, c.params);
            c.user.emit('getNewServersData', data);
        });


    }
    generateWSresponses() {
        for (let i = 0; i < responsesCountToGenerate; i++)
            this.wsData.forEach(ws => {
                let req = this.getRandomYesNo();
                if (req) {
                    let kind = this.getRandomInt(5);
                    switch (kind) {
                        case 1: {
                            ws.responses.push(this.addResponse(respFirstLimit));
                            break;
                        }
                        case 2: {
                            ws.responses.push(this.addResponse(respSecondLimit));
                            break;
                        }
                        case 3: {
                            ws.responses.push(this.addResponse(respThirdLimit));
                            break;
                        }
                        case 4: {
                            ws.responses.push(this.addResponse(respFourthLimit));
                            break;
                        }
                    }
                }
            });
    }

    addResponse(time) {
        return { code: codes[this.getRandomInt(codes.length)], time: this.getRandomInt(time) }
    }

    generateWSerrors() {
        //get this day
        let tmp = new Date();
        //get end of previos day in ms
        let startDate = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate()).getTime();
        //get start of previos day in ms
        let endDate = startDate + 24*60*60*1000;
        //Prepare fails levels for APIs
        let errorLevel = [];
        this.wsData.forEach(ws => {
            ws.apis.forEach(api => {
                errorLevel.push(this.getRandomInt(10));
            });
        });
        //Fill by 5 seconds
        for (let i = 0; startDate < endDate; startDate += errorGenerateStap) {
            this.wsData.forEach(ws => {
                ws.apis.forEach(api => {
                    if (Math.random() > errorGenerateLevel) {
                        if (this.getRandomInt(10) > errorLevel[i])
                            api.errs.push(startDate);
                    }
                    i++;
                });
                i++;
            });
            i = 0;
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    getRandomYesNo() {
        return Math.random() > 0.5;
    }
}