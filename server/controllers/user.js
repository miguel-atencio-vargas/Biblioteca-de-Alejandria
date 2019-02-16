'use strict'

const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

function createUser(req, res) {
    let body = req.body;
    bcrypt.hash(body.password, 10)
        .then((hash) => {
            let user = new User({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hash,
                birthdate: body.birthdate,
                sex: body.sex.toLowerCase(),
                role: body.role
            });
            user.save((err, userDB) => {
                if (err) return errorMessage(err, res, 400);
                res.json({
                    ok: true,
                    userDB,
                    message: 'Usuario creado correctamente'
                });
            });
        }).catch(err => {
            return errorMessage(err, res, 500);
        })

}

function login(req, res) {
    let body = req.body;
    checkUser(body.email, body.password)
        .then((resp) => {
            res.json({
                ok: true,
                userDB: resp.userDB,
                token: resp.token
            });
        })
        .catch((error) => {
            errorMessage(error.toString(), res, 404);
        });
}

async function checkUser(userEmail, password) {
    let userDB = await User.find({ email: userEmail }, 'password email');
    if (userDB.length > 0) {
        let match = await bcrypt.compare(password, userDB[0].password);
        if (match) {
            let token = jwt.sign({ user: userDB }, process.env.SEED, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            });
            return {
                token,
                userDB
            };
        } else {
            throw new Error('(Usuario o) contraseña incorrecto');
        }
    } else {
        throw new Error('Usuario (o contraseña) incorrecto');
    }
}


module.exports = {
    createUser,
    login
}




/*Funcion para manejar los errores*/
let errorMessage = (error, res, status, message) => {
    return res.status(status).json({
        ok: false,
        error,
        message
    });
}