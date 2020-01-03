var mongoose = require('mongoose');
const VMServer = require('../scheme/vMServer')
const WebService = require('../scheme/WebService')

module.exports = {
    GetServers: async function (params) {
        if (!params)
            return await VMServer.find();
        else {
            return await VMServer.find({ name: { "$in": params.servers } });
        }
    },
    AddNewServersData: async function (data) {
        try {
            for (let i = 0; i < data.length; i++) {
                const server = await VMServer.findOne({ name: data[i].name });
                if (!server) {
                    let serverData = new VMServer({
                        _id: new mongoose.Types.ObjectId(),
                        name: data[i].name,
                        vms: data[i].vms,
                    })
                    await serverData.save();
                }
                else {
                    server.vms.forEach(vm => {
                        data[i].vms.forEach(newVm => {
                            if (vm.name == newVm.name)
                                vm.data.push(newVm.data[0]);
                        })
                    })
                    await server.save();
                }
            }
            console.log("New VMs Data Inbounds");
        } catch (error) {
            console.log(error);
        }
    },
    GetNewServersData: async function (params) {
        if (!params) {
            let all = await VMServer.find();
            //need to schange finding from DB by params
            let newData = [];
            all.forEach(srv => {
                let vmNewData = [];
                srv.vms.forEach(vm => {
                    let lastCpuUsage = vm.data[vm.data.length - 1].cpuUsage;
                    let lastMemUsage = vm.data[vm.data.length - 1].memUsage;
                    vmNewData.push({ name: vm.name, data: [{ cpuUsage: lastCpuUsage, memUsage: lastMemUsage }] });
                });
                newData.push({ name: srv.name, vms: vmNewData });
            });
            return newData;
        }
        else {
            let all = await VMServer.find({ name: { "$in": params.servers } });
            //need to schange finding from DB by params
            let newData = [];
            all.forEach(srv => {
                let vmNewData = [];
                srv.vms.forEach(vm => {
                    let lastCpuUsage = vm.data[vm.data.length - 1].cpuUsage;
                    let lastMemUsage = vm.data[vm.data.length - 1].memUsage;
                    vmNewData.push({ name: vm.name, data: [{ cpuUsage: lastCpuUsage, memUsage: lastMemUsage }] });
                });
                newData.push({ name: srv.name, vms: vmNewData });
            });
            return newData;
        }
    },
    GetResponses: async function (date) {
        if (!date) {
            data = await WebService.find();
            toSend = [];
            data.forEach(ws => {
                toSend.push({ name: ws.name, responses: ws.data[ws.data.length - 1].responses });
            })
            return toSend;
        }
        else {
            //need to find in DB by data
            return;
        }
    },
    GetErrors: async function (params) {
        if (!params) {
            data = await WebService.find();
            toSend = [];
            data.forEach(ws => {
                ws.data[ws.data.length - 1].apis.forEach(api => {
                    toSend.push([ws.name + "/" + api.name, api.errs.length]);
                });
            })
            //stam dugma
            // let pipe_line = [{ "$match": { "email": employee.email } },
            // { "$unwind": "$workerData.data" },
            // {
            //     "$project": {
            //         "_id": 0,
            //         "d": { "$dayOfMonth": "$workerData.data.start" },
            //         "m": { "$month": "$workerData.data.start" },
            //         "y": { "$year": "$workerData.data.start" },
            //         "h": { "$subtract": ["$workerData.data.end", "$workerData.data.start"] }
            //     }
            // },
            // { "$match": { "$and": [{ "m": month }, { "y": year }] } },
            // { "$group": { "_id": { "day": "$d" }, "total": { "$sum": "$h" } } },
            // { "$project": { "_id": 0, "day": "$_id.day", "total": "$total" } },
            // { "$sort": { "day": 1 } }
            // ];
            // let lastDayFAils = await this.WebService.aggregate(pipe_line).exec();
            return toSend;
        }
        else {
            //need to find in DB by params
            return;
        }
    },
    AddWSData: async function (data) {
        try {
            let date = Date.now();
            for (let i = 0; i < data.length; i++) {
                const webService = await WebService.findOne({ name: data[i].name });
                if (!webService) {
                    let newWebService = new WebService({
                        _id: new mongoose.Types.ObjectId(),
                        name: data[i].name,
                        data: [{ date: date, responses: data[i].responses, apis: data[i].apis }]
                    });
                    //Save
                    await newWebService.save();
                }
                else {
                    webService.data.push({ date: date, responses: data[i].responses, apis: data[i].apis });
                    await webService.save();
                }
            }
            console.log("New WSs Data Inbounds");
        } catch (error) {
            console.log(error);
        }
    }
}