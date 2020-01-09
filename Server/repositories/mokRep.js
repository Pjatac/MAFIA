var mongoose = require('mongoose');
const VMServer = require('../scheme/vMServer')
const WebService = require('../scheme/WebService')
const DATA_COUNT = 15;
// var sleep = require('sleep');

module.exports = {
    GetServers: async function (params) {
        if (!params) {
            let lastChanges = await VMServer.aggregate([
                { $unwind: "$vms" },
                { $project: { "_id": 0, name: 1, "vms": { name: "$vms.name", data: { $slice: ["$vms.data", -DATA_COUNT] } } } },
                { $group: { "_id": { name: "$name" }, vms: { "$push": "$vms" } } },
                { $project: { "_id": 0, name: "$_id.name", vms: "$vms" } }
            ]).exec();
            return lastChanges;
        }
        else {
            //console.time('label');
            // executing time for this code with 4 servers and period 1 hour = 368ms 
            // let serversData = [];
            // let servers = await VMServer.find({ name: { "$in": params.servers } } );
            // servers.forEach(srv => {              
            //     serversData.push({name: srv.name, vms: []});
            //     srv.vms.forEach(vm => {
            //         vmData = {name: vm.name, data: []}                   
            //         for (let i = vm.data.length -1; i > vm.data.length - 1 - params.period*DATA_COUNT; i -= params.period)
            //             if (vm.data[i])
            //                 vmData.data.push(vm.data[i]);
            //         serversData[serversData.length - 1].vms.push(vmData);
            //     })
            // });

            // executing time for this code with 4 servers and period 1 hour = 366ms 
            let lastChanges = await VMServer.aggregate([
                { $match: { name: { "$in": params.servers } } },
                { $unwind: "$vms" },
                {
                    $project: {
                        "_id": 0, name: 1,
                        "vms": {
                            name: "$vms.name",
                            data: {
                                $map: {
                                    input: {
                                        $range: [{
                                            $add: [{ $size: "$vms.data" }, -1]
                                        },
                                        { $add: [{ $size: "$vms.data" }, -params.period * DATA_COUNT] },
                                        -params.period]
                                    },
                                    in: { $arrayElemAt: ["$vms.data", "$$this"] }
                                }
                            }
                        }
                    }
                },
                { $group: { "_id": { name: "$name" }, vms: { "$push": "$vms" } } },
                { $project: { "_id": 0, name: "$_id.name", vms: "$vms" } }
            ]).exec();
            //console.timeEnd('label');
            return lastChanges;
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
            let lastChanges = await VMServer.aggregate([
                { $unwind: "$vms" },
                { $project: { "_id": 0, name: 1, "vms": { name: "$vms.name", data: { $arrayElemAt: ["$vms.data", -1] } } } },
                { $group: { "_id": { name: "$name" }, vms: { "$push": "$vms" } } },
                { $project: { "_id": 0, name: "$_id.name", vms: "$vms" } }
            ]).exec();
            return lastChanges;
        }
        else {
            let lastChanges = await VMServer.aggregate([
                { $match: { name: { "$in": params.servers } } },
                { $unwind: "$vms" },
                { $project: { "_id": 0, name: 1, "vms": { name: "$vms.name", data: { $arrayElemAt: ["$vms.data", -1] } } } },
                { $group: { "_id": { name: "$name" }, vms: { "$push": "$vms" } } },
                { $project: { "_id": 0, name: "$_id.name", vms: "$vms" } }
            ]).exec();
            return lastChanges;
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
            let year = date.getFullYear;
            let
            // data = await WebService.aggregate([
            //     { $unwind: "$data" },
            //     { $project: {
            //         date: {
            //            $dateToParts: { date: "$data.date" }
            //         }
            //     }},
            //     { $match: {"data.date":{}},
            // ]);
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
            return toSend;
        }
        else {
            data = await WebService.aggregate([
                { $match: { name: { "$in": params.wsList } } },

            ]).exec();
            toSend = [];
            data.forEach(ws => {
                ws.data[ws.data.length - 1].apis.forEach(api => {
                    toSend.push([ws.name + "/" + api.name, api.errs.length]);
                });
            })
            return toSend;
        }
    },
    AddWSData: async function (data) {
        try {
            let date = new Date();
            date = date.setHours(date.getHours() - 24);
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