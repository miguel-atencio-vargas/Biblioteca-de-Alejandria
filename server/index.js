'use strict'

const mongoose = require('mongoose');
const app = require('./app');
// importamos la configuracion
require('./config/config');

const uriDB = process.env.URL_DB;
const port = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(uriDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log(`Conexión establecida con la base de datos`);
        app.listen(port, () => {
            console.log(`Server running `);
        });
    })
    .catch((e) => {
        console.log('Error al servir la aplicacion: ', e)
    });