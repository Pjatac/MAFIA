const UserRep = require('../repositories/userRep');
const AuthService = require('./authService');

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
    Login: async (data, socket) => {
        let user = await UserRep.GetUser(data.userName);
        let result = { status: false };
        if (user) {
            if (data.password == user.password) {
               // result.token = AuthService.CreateValidationToken(user.userName);
			    result.token = "fsdkm32487fsdnmskaji32u8i32j4ijls";
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