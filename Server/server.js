const log = require('simple-node-logger').createSimpleLogger('server.log');
const server = require('http').createServer();
const io = require('socket.io')(server);
const ConnectToDb = require('./database');
const sessionRouter = require('./router');
const mockServer = require('./mock/mock');
const PORT = 100;   
ConnectToDb();
sessionRouter.sessionRouter(io);
mockServer.Start();
server.listen(PORT);
//console.log();
log.info("Server started on port ",PORT);
