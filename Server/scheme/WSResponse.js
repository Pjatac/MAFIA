const mongoose = require('mongoose');

const WSResponseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    data:[{date:Date,
    responses: [{
        code: Number,
        time: Number
    }]}]
});

module.exports = mongoose.model('WSResponse', WSResponseSchema);