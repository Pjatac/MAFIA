const ioClient = require('socket.io-client');

var socketClient = ioClient("http://localhost:150");
console.log("Mock Server is up!");


module.exports = {

    Start: async () =>{
        socketClient.on('getAllServers',(data) =>{
        
            console.log(data);
            
        });
        socketClient.on('getNewServersData',(data) =>{
            console.log(data);
            
        });
    }
    
}

