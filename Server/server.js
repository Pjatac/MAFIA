require('dotenv').config();
const log = require('simple-node-logger').createSimpleLogger('server.log');
const http = require('http');
const express = require('express'),
    app = module.exports.app = express();
const server = http.createServer(app);
//const io = require('socket.io').(server);
const io = require('socket.io').listen(server,{
  perMessageDeflate :false
});
const options = { index: 'index.html' }; 
app.use('/', express.static('/home/site/wwwroot', options));
io.origins('*:*');
io.set('transports', ['websocket']);
const ConnectToDb = require('./database');
const sessionRouter = require('./router');
const mockServer = require('./mock/mock');
const PORT = process.env.PORT || process.env.SERVER_PORT;   
ConnectToDb();
sessionRouter.sessionRouter(io);
mockServer.Start();
server.listen(PORT);

log.info("Server started on port ",PORT);