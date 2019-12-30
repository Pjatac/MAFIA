const ioClient = require('socket.io-client');
const MockRep = require('../repositories/mokRep');
var socketClient = ioClient("http://localhost:150");
console.log("Mock Server is up!");


module.exports = {

    Start: async () =>{
        socketClient.on('getAllServers',(data) =>{
        
            MockRep.AddNewData(data);
            
        });
        socketClient.on('getNewServersData',(data) =>{
            console.log(data);
            
        });
    }
    
}

