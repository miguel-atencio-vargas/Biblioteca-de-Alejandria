/*========================================================
Entorno para saber si estoy en desarrollo o en producción
========================================================*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/*===========================
----------Puerto-------------
=============================*/
process.env.PORT = process.env.PORT || 9477;


/*===========================
--------Base de datos--------
//===========================*/
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/alexandriaDB';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URL_DB = urlDB;

/*============================
------Vencimiento del token---
==============================*/
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '48h';

/*===========================
-----SEED de autenticacion---
=============================*/
process.env.SEED = process.env.SEED || 'este es el SEED de desarrollo';