'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');


const app = express();
const router = express.Router();

//Connecta ao banco
mongoose.connect(config.connectionString);

//Carrega os Models
const ProdutoModel = require('./models/produto-model');
const Customer = require('./models/customer');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const produtosRoute = require('./routes/produtos');
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', indexRoute);
app.use('/produtos', produtosRoute);
app.use('/customers', customerRoute);

module.exports = app;

// 200 status, 201 create, 400 erro bad, 401 não atenticado, 403 acesso negado, 500 Qualquer erro.