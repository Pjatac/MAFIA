const log = require('simple-node-logger').createSimpleLogger('server.log');
const server = require('http').createServer();
const io = require('socket.io')(server);
require('dotenv').config();
const ConnectToDb = require('./database');
const sessionRouter = require('./router');
const mockServer = require('./mock/mock');
const PORT = process.env.SERVER_PORT;   
ConnectToDb();
sessionRouter.sessionRouter(io);
mockServer.Start();
server.listen(PORT);
//console.log();
log.info("Server started on port ",PORT);

// try to add Self_TRUSTED key and SSL connection
// process.env.NODE_ENV = 'development';
// const log = require('simple-node-logger').createSimpleLogger('server.log');
// const ConnectToDb = require('./database');
// const sessionRouter = require('./router');
// const mockServer = require('./mock/mock');
// const PORT = 3003;
// ConnectToDb();

// var fs = require('fs');
// var https = require('https');
// var path = require('path');

// const server =
//     https.createServer({
//         key: fs.readFileSync(
//            './ssl/localhost.key'
//         ),
//         cert: fs.readFileSync(
//            './ssl/localhost.crt'
//         ),
//         requestCert: false,
//         rejectUnauthorized: false
//     });


// const io = require('socket.io')(server);
// server.listen(PORT);

// sessionRouter.sessionRouter(io);
// mockServer.Start();
// log.info("Server started on port ", PORT);