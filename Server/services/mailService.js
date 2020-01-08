var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ar.terekhov100@gmail.com',
        pass: 'dostup21'
    }
});

module.exports = {

    SendMail: (mailStruct) => {
        var mailOptions = {
            from: 'santinol_analics@gmail.com',
            to: mailStruct.adresses,
            subject: 'Your request for system state image',
            text: 'With best regards',
            attachments: [
                {   // utf-8 string as an attachment
                    filename: mailStruct.name,
                    content: new Buffer(mailStruct.data)
                }
            ]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}




