var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ar.terekhov100@gmail.com',
        pass: 'dostup21'
    }
});

module.exports = {

    SendMail: async (socket, mailStruct) => {
        
        let base64Image = mailStruct.data.split(';base64,').pop();

        var mailOptions = {
            from: 'santinol_analics@gmail.com',
            to: mailStruct.adresses,
            subject: 'Your request for system state image',
            text: 'With best regards',
            attachments: [
                {
                    filename: mailStruct.name,
                    content: new Buffer.from(base64Image, 'base64')
                }
            ]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                socket.emit("mailSendResult", false);
                console.log(error);
            } else {
                socket.emit("mailSendResult", true)
                console.log('Email sent: ' + info.response);
            }
        });
    }
}




