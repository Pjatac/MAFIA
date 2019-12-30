const mongoose = require('mongoose');

const VMServerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    vms: [{
        name: String,
        data:[{
            cpuUsage: Number,
            memUsage: Number,
            Time : Date
        }]
    }],
});

module.exports = mongoose.model('VMServer', VMServerSchema);