const jwt = require('jsonwebtoken');
const secretToken = "tratatatratata";

module.exports = {

    CreateValidationToken: (item) => {
        return jwt.sign(item, secretToken);
    },
    CheckValidationToken: (token, socket) => {
        try {
            res = jwt.verify(token, secretToken);
            socket.emit("checkToken", true);
        }
        catch (err){
            console.log(err);
            socket.emit("checkToken", false)
        }
    }
}