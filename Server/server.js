const server = require('http').createServer();
const io = require('socket.io')(server);
const ConnectToDb = require('./database');
const sessionRouter = require('./router');
const PORT = 100;
ConnectToDb();
sessionRouter.sessionRouter(io);
server.listen(PORT);
console.log("Server started on port",PORT);
