const mongoose = require('mongoose');

const WebServiceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    data:[{
        date:Date,
        responses: [{
            code: Number,
            time: Number
        }],
        apis: [{
            name: String,
            errs: [Date]
        }]
    }]
});

module.exports = mongoose.model('WebService', WebServiceSchema);