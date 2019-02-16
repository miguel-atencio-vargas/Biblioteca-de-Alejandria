'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['video', 'book', 'article', 'image', 'podcast', 'webpage'],
    message: '{VALUE} no es un tipo de contenido valido'
};


let ContentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Se necesita un usuario para crear el contenido']
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag',
        required: [true, 'Se necesita por lo menos un Tag']
    },
    description: {
        type: String,
        required: false
    },
    file: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    typeOfContent: {
        type: String,
        required: [true, 'El tipo del contenido es obligatorio'],
        enum: typesOfContent
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
});

module.exports = mongoose.model('Content', ContentSchema);