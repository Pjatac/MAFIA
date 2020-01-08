var nodemailer = require('nodemailer');



module.exports = {

    SendMail: async (mailStruct) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ar.terekhov100@gmail.com',
                pass: 'dostup21'
            }
        });
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
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}




