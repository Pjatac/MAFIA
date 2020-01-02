const UserSerivce = require('./services/userService');
const MockService = require('./services/mockService')

var clients = [];
var ids = 1;
const DEFAULT_SEND_TIME = 1;
module.exports = {
    sessionRouter: (io) => {
        io.on('connection', function (socket) {

            const RegisterRequest = async (data) => {
                console.log("Register Request", data);

                await UserSerivce.Register(data, socket);
            }
            const GetAllServers = async function () {
                console.log("Get all servers request");
                
                await MockService.GetAllServers(socket);
            }
            const LoginRequest = async (data) => {
                console.log("Login Request", data);

                let res = await UserSerivce.Login(data, socket);
                if (res) {
                    let c = { id: ids, session: socket, defaultTime: DEFAULT_SEND_TIME, nextSendTime: AddMinutes(DEFAULT_SEND_TIME) }
                    clients.push(c);
                    ids++;
                    socket.emit("mockData", "Some mock data");

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
            socket.on("getAllServers",GetAllServers);
            socket.on('register-request', RegisterRequest);
            socket.on('login-request', LoginRequest);
            socket.on('fb-login-request', FbLoginReq);
            socket.on('chart-request', ChartRequest)
            socket.on('add-new-data', AddNewData)
            socket.on('logoutRequest', Disconnect);
            socket.on('disconnect', Disconnect);
        });
        setInterval(() => {
            console.log("Try to send");
            
            clients.forEach(cl => {
               // console.log(cl.nextSendTime);
                
                if (cl.nextSendTime < Date.now()) {
                    console.log("Send Data");
                    
                    await MockService.GetAllServers(cl.session);
                    cl.nextSendTime = AddMinutes(cl.defaultTime);
                }
            });
        }, 10000 / 1);
    }
}

const Disconnect = function () {
    clients.splice(clients.indexOf(x => x.session = socket), 1);
    console.log('user disconnected', clients.length);
}
const AddMinutes = function (minutes) {
    return new Date(Date.now() + minutes * 60000);
}
