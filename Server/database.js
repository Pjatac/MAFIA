var mongoose = require('mongoose');
require('dotenv').config();
module.exports  = function ConnectToDb()
{
    let dataString = process.env.DB_CONNECTION;
    mongoose.connect(dataString,
     {useNewUrlParser: true,useUnifiedTopology: true},
     console.log("Database Connection Successful"))
     .catch(err => console.log(err));
     
     
}
