const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    fbId: String,
});

module.exports = mongoose.model('FBUser', userSchema);