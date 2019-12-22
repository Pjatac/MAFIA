var mongoose = require('mongoose');
const User = require('../scheme/user');


module.exports = {
    RegisterUser : async function (data) {
        try {
            let user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: data.username,
                password: data.password
            });
            await user.save();
            return true;
        } catch (error) {
            //TO-DO : Write error to logger
            return false;
        }
    },
    GetUser : async function (Username) {
        try {
            let res = await User.findOne({ username: Username});
            return res;
        } catch (error) {
            //TO-DO : Write error to logger
            return null;
        }
    },
    
}