'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const app = express();


//-----------Middlewares----------//
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//-----------Ruta Index--------------//
app.use(require('./routes/routes'));




module.exports = app;