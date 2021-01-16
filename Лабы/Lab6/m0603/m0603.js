const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const sender = '';
const receiver = '';

module.exports.send = function (message) {
    let transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: false,
        auth: {
            user: sender,
            pass: ''
        }
    }));

    var mailOptions = {
        from: sender,
        to: receiver,
        subject: 'Lab6',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        error ? console.log(error) : console.log('Email sent: ' + info.response);
    })
};
