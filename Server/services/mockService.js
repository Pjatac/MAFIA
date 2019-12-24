const SLOTS = 15;
module.exports ={
    GetChart:async function(data,socket,client)
    {
        data = JSON.parse(data);
        console.log(data);
        
        let names = data.vmServers;
        let time = data.time * SLOTS;

        //Got the data from mock

        let chart1 = [];
        chart1.push('name- srv1');
        for (let i = 0; i < SLOTS; i++) {
            chart1.push(i);
        }
        socket.emit('chart-deliver',chart1);
        
            
        
    }
}