var mongoose = require('mongoose');
module.exports  = function ConnectToDb()
{
    //let dataString = 'mongodb+srv://all:all6@mafiac-ufhmj.mongodb.net/test?retryWrites=true&w=majority';
    //let dataString = 'mongodb://localhost:27017/admin'
    let dataString = 'mongodb://localhost:27017/cluster'
    mongoose.connect(dataString,
     {useNewUrlParser: true,useUnifiedTopology: true},
     console.log("Database Connection Successful"))
     .catch(err => console.log(err));
     
     
}
