var mongoose = require('mongoose');
const VMServer = require('../scheme/vMServer')

module.exports = {
    AddNewData: async function (data) {
        //console.log("Got to add sata",data);


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
    },
    AddWSData: async function (data){
    
    }
}