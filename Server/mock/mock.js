const ioClient = require('socket.io-client');

var socketClient = ioClient("http://localhost:150");
socketClient.on('getAllServers',(data) =>{
    console.log(data);
    
});
socketClient.on('getNewServersData',(data) =>{
   console.log(data);
   
});
