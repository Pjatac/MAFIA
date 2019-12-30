const UserRep = require('../repositories/userRep');
const AuthService = require('./authService');
const log = require('simple-node-logger').createSimpleLogger('server.log');


module.exports = {
    Register: async (data, socket) => {
        let user = await UserRep.GetUser(data.userName);
        if (!user) {
            await UserRep.RegisterUser(data);
            socket.emit('register-res', true);
        }
        else {
            socket.emit('register-res', false);
        }
    },
    FBLogin: async (data, socket) => {
        log.info("A new FB Login request from id :",data.fbID)
        let user = await UserRep.GetFBUser(data.fbID);
        let result = { status: true };
        if (!user) {
            let res = await UserRep.RegisterFBUser(data);
            if (res) {
                result.token = await UserRep.GetToken(15);
                socket.emit("fb-login-res", result);
            }
            else {
                socket.emit("fb-login-res", false);
            }
        }
        else {
            result.token = await UserRep.GetToken(15);
            socket.emit("fb-login-res", result);
        }
    },
    Login: async (data, socket) => {
        let user = await UserRep.GetUser(data.userName);
        let result = { status: false };
        if (user) {
            if (data.password == user.password) {
                result.token = await UserRep.GetToken();
                result.status = true;
            }
            else {
                result.err = "Password is not correct";
            }
        }
        else {
            result.err = "User not exist";
        }
        socket.emit('login-res', result);
        return result.status;
    }
}