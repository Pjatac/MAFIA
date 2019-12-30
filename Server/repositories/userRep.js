var mongoose = require('mongoose');
const User = require('../scheme/user');
const FBUser = require('../scheme/fbUser');


module.exports = {
    RegisterUser : async function (data) {
        try {
            let user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: data.userName,
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
    RegisterFBUser : async function(data)
    {
        try {
            let user = new FBUser({
                _id: new mongoose.Types.ObjectId(),
                fbId: data.fbID,
                email: data.email
            });
            await user.save();
            return true;
        } catch (error) {
            //TO-DO : Write error to logger
            return false;
        }
    },
    GetFBUser : async function (FbID) {
        try {
            let res = await FBUser.findOne({ fbId: FbID});
            return res;
        } catch (error) {
            //TO-DO : Write error to logger
            return null;
        }
    },
    
}