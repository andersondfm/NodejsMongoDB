'use strict';
var config = require('../config');
var sendgrid = require('sendgrid')('Sua Key Sendgrid And');


exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'anderson.migloranza@gmail.com',
        subject: subject,
        html: body
    });
}
