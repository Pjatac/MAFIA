const mongoose = require('mongoose');

const VMServerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    VMList: [{
        Name: String,
        Data:[{
            CPU: Number,
            Memory: Number
        }]
    }],
});

module.exports = mongoose.model('VMServer', VMServerSchema);