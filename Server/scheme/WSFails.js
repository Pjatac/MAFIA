const mongoose = require('mongoose');

const WSFailsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    apis: [{
        name: String,
        errors: [{time:Date}]
    }]
});

module.exports = mongoose.model('WSFails', WSFailsSchema);