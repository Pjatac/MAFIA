const server = require('http').createServer();
const io = require('socket.io')(server);
const ConnectToDb = require('./database');
const User = require('./scheme/user');
var mongoose = require('mongoose');
var sessionRouter = require('./router');


//Test for MushMush
ConnectToDb();
sessionRouter.sessionRouter(io);


const port = 100;
server.listen(port);
console.log("Server started on port",port);
