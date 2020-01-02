var mongoose = require('mongoose');
const VMServer = require('../scheme/vMServer')

module.exports = {
    GetServers: async function (params) {
        if (!params)
            return await VMServer.find();
        else
            {
                return await VMServer.find().limit(1);
            }
        },
    AddNewServersData: async function (data) {
        //console.log("Got to add sata",data);


        try {
            for (let i = 0; i < data.length; i++) {
                let date = Date.now();
                const server = await VMServer.findOne({ name: data[i].name });
                if (!server) {
                    let serverData = new VMServer({
                        _id: new mongoose.Types.ObjectId(),
                        name: data[i].name,
                        vms: data[i].vms,
                    })
                    serverData.vms.forEach(data => {
                        data.Time = date;
                    });
                    //Save
                    await serverData.save();
                }
                else
                {
                    server.vms.forEach(vm => {
                        data[i].vms.forEach(newVm => {
                            if (vm.name == newVm.name)
                                vm.data.push(newVm.data[0]);
                        })
                    })
                    await server.save();
                }
            }
            console.log("New Data Inbounds");



        } catch (error) {
            console.log(error);

        }
    },
    AddWSData: async function (data) {
        try {
            for (let i = 0; i < data.length; i++) {
                let date = Date.now();
                let serverData = new VMServer({
                    _id: new mongoose.Types.ObjectId(),
                    name: data[i].name,
                    vms: data[i].vms,
                })
                serverData.vms.forEach(dat => {
                    dat.Time = date;
                });
                //Save
                // await serverData.save();
            }
            console.log("New Data Inbounds");



        } catch (error) {
            console.log(error);

        }
    }
}