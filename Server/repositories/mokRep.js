var mongoose = require('mongoose');
const VMServer = require('../scheme/vMServer');
const WebService = require('../scheme/WebService');
require('dotenv').config();
const DATA_COUNT = process.env.DATA_COUNT;

module.exports = {
    GetServers: async function (params) {
        let lastChanges;
        if (!params) {
            lastChanges = await VMServer.aggregate([
                { $unwind: "$vms" },
                { $project: { "_id": 0, name: 1, "vms": { name: "$vms.name", data: { $slice: ["$vms.data", -DATA_COUNT] } } } },
                { $group: { "_id": { name: "$name" }, vms: { "$push": "$vms" } } },
                { $project: { "_id": 0, name: "$_id.name", vms: "$vms" } }
            ]).exec();
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
            lastChanges = await VMServer.aggregate([
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
                                            $add: [{ $size: "$vms.data" }, -params.period * (DATA_COUNT)]
                                        },
                                        { $size: "$vms.data" },
                                        parseInt(params.period)]
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
        }
        this.clearVMsIDs(lastChanges);
        return lastChanges;
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
        let toSend = [];
        if (!date) {
            data = await WebService.find().lean();
            data.forEach(ws => {
                //getting last record from DB
                toSend.push({ name: ws.name, responses: ws.data[ws.data.length - 1].responses });
            })
        }
        else {
            //need implementation on client side?
            date = new Date();
            const dayStart = this.getDayStart(date);//create for filtring data by days - start of searching day
            const dayEnd = this.getDayEnd(date);//create for filtring data by days - end of searching day
            data = await WebService.find({ data: { "$elemMatch": { date: { $gte: dayStart, $lt: dayEnd } } } }).lean();
            data.forEach(ws => {
                toSend.push({ name: ws.name, responses: ws.data[0].responses });
            })
        }
        this.clearReaponsesIDs(toSend);
        return toSend;
    },

    GetErrors: async function (params) {
        search = await this.setFailsPipeLineByParams(params);
        data = await WebService.aggregate(search).exec();
        toSend = [];
        data.forEach(api => {
            toSend.push([api.name, api.errs]);
        })
        return toSend;
    },

    setFailsPipeLineByParams: async function (params) {
        let err_pipe_line;
        if (!params) {//first client request - return all names of APIs and data for today
            const dayStart = this.getDayStart(new Date());//create for filtring data by days - start of searching day
            const dayEnd = this.getDayEnd(new Date());//create for filtring data by days - end of searching day
            checkData = await WebService.find({ data: { "$elemMatch": { date: { $gte: dayStart, $lt: dayEnd } } } });//check data exist for today
            if (checkData.length > 0) {
                err_pipe_line = [
                    { $unwind: "$data" },
                    { $match: { "data.date": { $gte: dayStart, $lt: dayEnd } } },
                    { $unwind: "$data.apis" },
                    { $project: { _id: 0, name: 1, api: "$data.apis" } },
                    { $project: { "_id": 0, name: { $concat: ["$name", "/", "$api.name"] }, errs: { $size: "$api.errs" } } },
                ];
            }
            else {//return only APIs names
                err_pipe_line = [
                    { $unwind: "$data" },
                    { $unwind: "$data.apis" },
                    { $project: { _id: 0, name: 1, api: "$data.apis" } },
                    { $project: { "_id": 0, name: { $concat: ["$name", "/", "$api.name"] } } },
                    { $group: { "_id": "$name" } },
                    { $project: { "_id": 0, name: "$_id" } }
                ];
            }
        }
        else {
            const dayStart = this.getDayStart(params.date);//create for filtring data by days - start of searching day
            const dayEnd = this.getDayEnd(params.date);//create for filtring data by days - end of searching day
            params.period.start += dayStart.getTime();//set start period in ms
            params.period.end += dayStart.getTime();//set end period in ms
            apiList = [];
            params.apiList.forEach(api => apiList.push(api.split('/').pop()));
            err_pipe_line = [
                { $unwind: "$data" },//separate data array
                { $match: { "data.date": { $gte: dayStart, $lt: dayEnd } } },//select day by params date
                { $unwind: "$data.apis" },//separate APIs data
                { $project: { _id: 0, name: 1, api: "$data.apis" } },//separate APIs data
                { $match: { "api.name": { $in: apiList } } },//select APIs by params 
                {
                    $project: {//select period by params 
                        _id: 0, name: 1, api: {
                            name: "$api.name", errs: {
                                $filter: {
                                    input: "$api.errs",
                                    as: "time",
                                    cond: {
                                        $and: [
                                            { $gte: ["$$time", params.period.start] },
                                            { $lte: ["$$time", params.period.end] }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                },
                { $project: { "_id": 0, name: { $concat: ["$name", "/", "$api.name"] }, errs: { $size: "$api.errs" } } },//union names
                { $sort: { errs: -1 } },//sort for top
                { $limit: parseInt(params.top) }//select top by params
            ];
        }
        return err_pipe_line;
    },

    getDayStart: function (date) {
        return new Date(new Date(date).setHours(0, 0, 0, 0));
    },

    getDayEnd: function (date) {
        startOfDay = this.getDayStart(date);
        endOfDay = startOfDay.setTime(startOfDay.getTime() + 24 * 60 * 60 * 1000);
        return new Date(endOfDay);
    },

    AddWSData: async function (data) {
        try {
            let date = new Date();
            //check for today data existing
            const dayStart = this.getDayStart(new Date());//create for filtring data by days - start of searching day
            const dayEnd = this.getDayEnd(new Date());//create for filtring data by days - end of searching day
            checkData = await WebService.find({ data: { "$elemMatch": { date: { $gte: dayStart, $lt: dayEnd } } } });
            if (checkData.length === 0)
                for (let i = 0; i < data.length; i++) {
                    const webService = await WebService.findOne({ name: data[i].name });
                    if (!webService) {
                        let newWebService = new WebService({
                            _id: new mongoose.Types.ObjectId(),
                            name: data[i].name,
                            data: [{ date: date, responses: data[i].responses, apis: data[i].apis }]
                        });
                        await newWebService.save();
                    }
                    else {
                        webService.data.push({ date: date, responses: data[i].responses, apis: data[i].apis });
                        await webService.save();
                    }
                }
            console.log("WSs Data Inbounds");
        } catch (error) {
            console.log(error);
        }
    },

    clearVMsIDs(lastChanges) {
        lastChanges.forEach( srv => {
            delete srv._id;
            srv.vms.forEach( vm => {
                delete vm._id;
                vm.data.map(el => delete el._id);
            });
        });
    },

    clearReaponsesIDs(toSend) {
        toSend.forEach( service => {
            service.responses.map(el => delete el._id);
        })
    }
}