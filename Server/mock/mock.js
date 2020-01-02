const ioClient = require('socket.io-client');
const MockRep = require('../repositories/mokRep');
var socketClient = ioClient("http://localhost:150");
console.log("Mock Server is up!");


module.exports = {

    Start: async () =>{
        
        socketClient.on('getNewServersData',async (data) =>{
            await MockRep.AddNewServersData(data);
        });
        
        socketClient.on('getWsData',async(data) =>{
         await MockRep.AddWSData(data);
        });

        socketClient.emit('getWsData');
    }
    
}

