var mongoose = require('mongoose');
const User = require('../scheme/user');
const FBUser = require('../scheme/fbUser');


module.exports = {
    RegisterUser: async function (data) {
        try {
            let user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: data.userName.toLower(),
                password: data.password
            });
            await user.save();
            return true;
        } catch (error) {
            //TO-DO : Write error to logger
            return false;
        }
    },
    GetUser: async function (Username) {
        try {
            let res = await User.findOne({ username: Username.toLower() });
            return res;
        } catch (error) {
            //TO-DO : Write error to logger
            return null;
        }
    },
    GetToken: async (len) => {
        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length,
            length = len || 32;
        var token = "";
        for (var i = 0; i < length; i++) {
            buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
            token += buf[i];
        }
        return token;
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
            //TO-DO : Write error to logger
            return false;
        }
    },
    GetFBUser: async function (FbID) {
        try {
            let res = await FBUser.findOne({ fbId: FbID });
            return res;
        } catch (error) {
            //TO-DO : Write error to logger
            return null;
        }
    },
}