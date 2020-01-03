const UserSerivce = require('./services/userService');
const MockService = require('./services/mockService')

var clients = [];
var ids = 1;
var sendInterval = 1;

module.exports = {
    sessionRouter: (io) => {
        io.on('connection', function (socket) {
            //add new connected client
            let c = { id: ids, session: socket, nextSendTime: new Date() }
            clients.push(c);
            ids++;

            const RegisterRequest = async (data) => {
                console.log("Register Request", data);
                await UserSerivce.Register(data, socket);
            }

            const LoginRequest = async (data) => {
                console.log("Login Request", data);
                await UserSerivce.Login(data, socket);
            }

            const AddNewData = async (data) => {
                await MockService.AddNewMockData(data);
            }

            const FbLoginReq = async (data) => {
                await UserSerivce.FBLogin(data, socket);
            }

            const GetServers = async (params) => {
                if (params) {
                    clients.forEach(cl => {
                        if (cl.session == socket) {
                            cl.params = params;
                            cl.nextSendTime = AddMinutes(params.period);
                        }
                    })
                }
                await MockService.GetServers(socket, params);
            }

            const GetResponses = async (date) => {
                await MockService.GetResponses(socket, date);
            }

            const GetErrors = async (params) => {
                await MockService.GetErrors(socket, params);
            }

            socket.on('getErrors', GetErrors);
            socket.on('getResponses', GetResponses);
            socket.on('getServers', GetServers);
            socket.on('register-request', RegisterRequest);
            socket.on('login-request', LoginRequest);
            socket.on('fb-login-request', FbLoginReq);
            socket.on('add-new-data', AddNewData);
            socket.on('disconnect', Disconnect);

            console.log("a new user connected", clients.length);
        });
        setInterval(() => {
            console.log("Started");

            clients.forEach(cl => {
                if (cl.nextSendTime < Date.now()) {
                    MockService.GetNewServersData(cl.session, cl.params);
                    if (cl.params)
                        cl.nextSendTime = AddMinutes(cl.params.period);
                    else
                        cl.nextSendTime = AddMinutes(sendInterval);
                }
            });
        }, 30000 / 1);
    }
}

const Disconnect = function () {
    clients.splice(clients.indexOf(x => x.session = socket), 1);
    ids--;
    console.log('user disconnected', clients.length);
}

const AddMinutes = function (minutes) {
    return new Date(Date.now() + minutes * 60000);
}
