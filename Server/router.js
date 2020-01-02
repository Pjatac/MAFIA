const UserSerivce = require('./services/userService');
const MockService = require('./services/mockService')

var clients = [];
var ids = 1;
module.exports = {
    sessionRouter: (io) => {
        io.on('connection', function (socket) {

            const RegisterRequest = async (data) => {
                console.log("Register Request", data);

                await UserSerivce.Register(data, socket);
            }
            const LoginRequest = async (data) => {
                console.log("Login Request", data);

                let res = await UserSerivce.Login(data, socket);
                if (res) {
                    let c = { id: ids, session: socket, time: 5, lastSentTime: Date.now() }
                    clients.push(c);
                    ids++;
                }
            }
            const ChartRequest = async (data) => {
                await MockService.GetChart(data, socket, clients.find(x => x.session == socket));
            }
            const AddNewData = async (data) => {
                await MockService.AddNewMockData(data);
            }
            const FbLoginReq = async (data) => {
                await UserSerivce.FBLogin(data, socket);
            }
            console.log("a new user connected", clients.length);

            socket.on('register-request', RegisterRequest);
            socket.on('login-request', LoginRequest);
            socket.on('fb-login-request', FbLoginReq);
            socket.on('chart-request', ChartRequest)
            socket.on('add-new-data', AddNewData)
            socket.on('logoutRequest',Disconnect);
            socket.on('disconnect', Disconnect);

        });
    }
}
const Disconnect = function () {
    clients.splice(clients.indexOf(x => x.session = socket), 1);
    console.log('user disconnected', clients.length);
}
