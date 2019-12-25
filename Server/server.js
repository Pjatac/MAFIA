const server = require('http').createServer();
const io = require('socket.io')(server);
const ioClient = require('socket.io-client');

const ConnectToDb = require('./database');
const sessionRouter = require('./router');
const PORT = 100;


var socketClient = ioClient("http://localhost:150");
socketClient.on('getAllServers',(data) =>{
    console.log(data);
    
});
socketClient.on('getNewServersData',(data) =>{
   console.log(data);
   
});


ConnectToDb();
sessionRouter.sessionRouter(io);


server.listen(PORT);
console.log("Server started on port",PORT);
