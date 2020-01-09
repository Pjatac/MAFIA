var mongoose = require('mongoose');
const User = require('../scheme/user');
const FBUser = require('../scheme/fbUser');
const UserLogger = require('simple-node-logger').createSimpleLogger('db-user.log');


module.exports = {
    RegisterUser: async function (data) {
        try {
            let userN = ""+data.userName;
            let user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: userN.toLowerCase(),
                password: data.password
            });
            await user.save();
            return true;
        } catch (error) {
            UserLogger.error("On DB register: ", error);
            return false;
        }
    },

    GetUser: async function (Username) {
        let userN = "" + Username;
        try {
            let res = await User.findOne({ username: userN.toLowerCase() });
            return res;
        } catch (error) {
            UserLogger.error("On DB getUser: ", error);
            return null;
        }
    },

    RegisterFBUser: async function (data) {
        try {
            let user = new FBUser({
                _id: new mongoose.Types.ObjectId(),
                fbId: data.fbID,
                email: data.email
            });
            await user.save();
            return true;
        } catch (error) {
            UserLogger.error("On DB FBregister: ", error);
            return false;
        }
    },

    GetFBUser: async function (FbID) {
        try {
            let res = await FBUser.findOne({ fbId: FbID });
            return res;
        } catch (error) {
            UserLogger.error("On DB getFBregister: ", error);
            return null;
        }
    },
}