const mongoose = require('mongoose');

const VMServerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerName: String,
    VMList: [{
        Name: String,
        Data:[{
            CPU: Number,
            Memory: Number,
            Time : Date
        }]
    }],
});

module.exports = mongoose.model('VMServer', VMServerSchema);