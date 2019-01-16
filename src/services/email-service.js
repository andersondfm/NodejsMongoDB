'use strict';
var config = require('../config');
var sendgrid = require('sendgrid')('Coloca Aqui Sua Key Aqui 3');

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'anderson.migloranza@gmail.com',
        subject: subject,
        html: body
    });
}