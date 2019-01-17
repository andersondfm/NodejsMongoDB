'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('produto-model');
const authService = require('../services/auth-service');

exports.get = async() => {
    const res = await Produto.find({
        active: true
}, 'title price slug');
return res;
}
