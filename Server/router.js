const UserSerivce = require('./services/userService');
const MockService = require('./services/mockService');
const AuthService = require('../Server/services/authService');
const MailService = require('../Server/services/mailService');

var clients = [];
var ids = 1;
var sendInterval = 1;

module.exports = {
    sessionRouter: (io) => {
        io.on('connection', function (socket) {
            

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

            const CheckToken = async (token) => {
                await AuthService.CheckValidationToken(token, socket);
            }

            const MailSendRequest = async (mailStruct) => {
                await MailService.SendMail(socket, mailStruct);
            }

            socket.on('getErrors', GetErrors);
            socket.on('getResponses', GetResponses);
            socket.on('getServers', GetServers);
            socket.on('register-request', RegisterRequest);
            socket.on('login-request', LoginRequest);
            socket.on('fb-login-request', FbLoginReq);
            socket.on('add-new-data', AddNewData);
            socket.on('disconnect', Disconnect);
            socket.on('check-token', CheckToken);
            socket.on('mailSendRequest', MailSendRequest);

            console.log(`a new user connected with nextSendTime ${AddMinutes(sendInterval)}`, clients.length);
            //add new connected client
            let c = { id: ids, session: socket, nextSendTime: AddMinutes(sendInterval) }
            clients.push(c);
            ids++;
        });
        setInterval(() => {
            console.log(`Check for sending on ${new Date()}`);
            clients.forEach(cl => {
                console.log(`Check for sending for client ${cl.id} with time ${cl.nextSendTime}`);
                if (cl.nextSendTime <= Date.now()) {
                    MockService.GetNewServersData(cl.session, cl.params);
                    if (cl.params) {
                        cl.nextSendTime = AddMinutes(cl.params.period);
                        console.log(`Set for client ${cl.id} new send time to ${cl.nextSendTime}`);
                    }
                    else {
                        cl.nextSendTime = AddMinutes(sendInterval);
                        console.log(`Set for client ${cl.id} new send time to ${cl.nextSendTime}`);
                    }
                }
            });
        }, 10000 / 1);
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
