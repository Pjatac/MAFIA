const UserSerivce = require('./services/userService');

var clients = [];
var ids = 1;
module.exports = {
    sessionRouter: (io) => {
        io.on('connection', function (socket) {
            let c = {
                id: ids,
                session: socket,
            }
            clients.push(c);
            ids++;
            console.log("a new user connected", clients.length);
            socket.on('register-request', async data => {
                 await UserSerivce.Register(data,socket);
               
            });
            
            socket.on('login-request',async data=> {
                await UserSerivce.Login(data,socket);
            })


            socket.on('disconnect', function () {
                clients.splice(clients.indexOf(x => x.session = socket), 1);
                console.log('user disconnected', clients.length);
            });
        });
    }
}