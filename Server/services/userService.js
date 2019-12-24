const UserRep = require('../repositories/userRep');
const AuthService = require('./authService');

module.exports = {
    Register: async (data, socket) => {
        data = JSON.parse(data);
        let user = await UserRep.GetUser(data.username);

        if (!user) {
            await UserRep.RegisterUser(data);
            socket.emit('register-res', true);
        }
        else {
            socket.emit('register-res', false);
        }
    },
    Login: async (data, socket) => {
        data = JSON.parse(data);
        let user = await UserRep.GetUser(data.username);
        let result = { status: false };
        if (user) {
            if (data.password == user.password) {
                result.token = AuthService.CreateValidationToken(user.username);
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