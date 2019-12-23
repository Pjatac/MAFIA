const server = require('http').createServer();
const io = require('socket.io')(server);
const ConnectToDb = require('./database');
var sessionRouter = require('./router');



ConnectToDb();
sessionRouter.sessionRouter(io);


const port = 100;
server.listen(port);
console.log("Server started on port",port);
