'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let validType = {
    values: ['historico', 'abstracto', 'inicial', 'secundario'],
    message: '{VALUE} no es un tipo de etiqueta valido'
};

let TagSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la etiqueta es requerido']
    },
    kind: {
        type: String,
        required: [true, 'El tipo de etiqueta es requerido'],
        enum: validType
    },
    higherId: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag',
        required: false
    },
    lowerId: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag',
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Tag', TagSchema);