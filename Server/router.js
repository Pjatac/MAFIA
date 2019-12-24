const UserSerivce = require('./services/userService');
const MockService = require('./services/mockService')

var clients = [];
var ids = 1;
module.exports = {
    sessionRouter: (io) => {
        io.on('connection', function (socket) {

            const RegisterRequest = async (data) => {
                await UserSerivce.Register(data, socket);
            }
            const LoginRequest = async (data) => {
                console.log("Login Request");
                
                let res = await UserSerivce.Login(data, socket);
                if (res) {
                    let c = { id: ids, session: socket }
                    clients.push(c);
                    ids++;
                }
            }
            const ChartRequest = async (data) =>{
                await MockService.GetChart(data,socket,clients.find(x=> x.session == socket));
            }
            const AddNewData = async (data) =>{
                await MockService.AddNewMockData(data);
            }
            console.log("a new user connected", clients.length);

            socket.on('register-request', RegisterRequest);
            socket.on('login-request', LoginRequest);
            socket.on('chart-request',ChartRequest)
            socket.on('add-new-data',AddNewData)
            socket.on('disconnect', function () {
                clients.splice(clients.indexOf(x => x.session = socket), 1);
                console.log('user disconnected', clients.length);
            });

        });
    }
}
