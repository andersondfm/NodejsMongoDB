'use strict';
var config = require('../config');
var sendgrid = require('sendgrid')('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');

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'anderson.migloranza@gmail.com',
        subject: subject,
        html: body
    });
}