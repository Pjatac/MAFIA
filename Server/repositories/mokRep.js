var mongoose = require('mongoose');
const VMServer = require('../scheme/vMServer')

module.exports = {
    AddNewData: async function (data) {
        console.log("Got to add sata");
        
        try {
            let vms = [];
            let vm = {
                Name: "VM1",
                Data: [{
                    CPU: 25,
                    Memory: 42,
                    Time : Date.now()
                }]
            }
            let vm1 = {
                Name: "VM2",
                Data: [{
                    CPU: 95,
                    Memory: 47,
                    Time : Date.now()
                }]
            }
            vms.push(vm);
            vms.push(vm1);
            let mockData = new VMServer({
                _id: new mongoose.Types.ObjectId(),
                ServerName: "Serv1",
                VMList: vms,
            })
            console.log('Saving New data');
            await mockData.save();
            console.log('New data added');

        } catch (error) {
            console.log(error);

        }
    }
}