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
        //console.log("Got to add sata",data);


        try {
            for (let i = 0; i < data.length; i++) {
                //let date = Date.now();
                const server = await VMServer.findOne({ name: data[i].name });
                if (!server) {
                    let serverData = new VMServer({
                        _id: new mongoose.Types.ObjectId(),
                        name: data[i].name,
                        vms: data[i].vms,
                    })
                    // serverData.vms.forEach(data => {
                    //     data.Time = date;
                    // });
                    //Save
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
    GetResponses: async function (date) {
        if (!date){
            data =  await WebService.find(); 
            toSend = []; 
            data.forEach(ws => {
                toSend.push({name: ws.name, responses: ws.data[ws.data.length - 1].responses});
            })
            return toSend;
        }
        else {
            return await VMServer.find({ name: { "$in": params.servers } });
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
                        data: [{date: date, responses: data[i].responses, apis: data[i].apis}]
                    });
                    //Save
                    await newWebService.save();
                }
                else {
                    webService.data.push({date: date, responses: data[i].responses, apis: data[i].apis});
                    await webService.save();
                }
            }
            console.log("New WSs Data Inbounds");



        } catch (error) {
            console.log(error);

        }
    }
}