'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

// generos validos
let validSexes = {
    values: ['femenino', 'masculino', 'otro', 'n/a'],
    message: '{VALUE} no es un sexo valido'
}
let rolesValidos = {
    values: ['ADMIN_ROLE', 'WRITE_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let UserSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    birthdate: {
        type: Date,
        required: false
    },
    sex: {
        type: String,
        required: false,
        enum: validSexes
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    subscription: {
        type: Date,
        default: Date.now(),
        required: false
    }
});
/* Modificamos el metodo toJson con el fin de borrar un atributo del esquema
Notar que el metodo toJson siempre se llama cuando se intenta imprimir.
Aqui tenemos que usar la funcion normal sin que sea de flecha, porque necesitamos el this.
En otras palabras quitamos la prop password cuando el objeto quiera pasarse a json*/
UserSchema.methods.toJSON = function() {
        // agarramos el valor de lo que sea que tenga en ese momento
        let user = this;
        // tomamos el objeto de ese usuario
        let userObject = user.toObject();
        //eliminamos la propiedad
        delete userObject.password;
        return userObject;
    }
    // usamos la libreria uniqueValidator para que nos de error cuando los datos tienen que ser unicos
UserSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});


module.exports = mongoose.model('User', UserSchema);