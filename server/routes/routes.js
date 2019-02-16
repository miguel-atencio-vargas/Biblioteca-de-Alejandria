const express = require('express');
const app = express();


//------Importacion de rutas----------//
app.use(require('./user'));


module.exports = app;