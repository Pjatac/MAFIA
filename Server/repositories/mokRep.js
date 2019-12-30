var mongoose = require('mongoose');
const VMServer = require('../scheme/vMServer')

module.exports = {
    AddNewData: async function (data) {
        console.log("Got to add sata");
        
        try {
            let date = Date.now();
            let serverData = new VMServer({
                _id: new mongoose.Types.ObjectId(),
                name: data.name,
                vms: data.vms,
            })
            serverData.vms.array.forEach(dat => {
                dat.Time = date;
            });
            console.log('Saving New data');
            await serverData.save();
            console.log('New data added');

            // let vm = {
            //     Name: "VM1",
            //     Data: [{
            //         CPU: 25,
            //         Memory: 42,
            //         Time : Date.now()
            //     }]
            // }
            // let vmsList = [];
            // vmsList.push(vm);
            
            // let serverData = new VMServer({
            //     _id: new mongoose.Types.ObjectId(),
            //     name: "Serv1",
            //     vms: vms,
            // })
            

        } catch (error) {
            console.log(error);

        }
    }
}