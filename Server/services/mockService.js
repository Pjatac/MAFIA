const MockRep = require('../repositories/mokRep')
const SLOTS = 15;
module.exports ={
    AddNewMockData: async function(data)
    {
        await MockRep.AddNewData(data);
    },
    GetServers: async function(socket, params) {
        socket.emit('getServers', await MockRep.GetServers(params));
    },
    GetResponses: async function(socket, date) {
        socket.emit('getResponses', await MockRep.GetResponses(date));
    },
    GetErrors: async function(socket, params) {
        socket.emit('getErrors', await MockRep.GetErrors(params));
    }
}