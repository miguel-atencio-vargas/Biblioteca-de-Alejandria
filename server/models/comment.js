'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario dueño del comentario es requerido']
    },
    content: {
        type: Schema.Types.ObjectId,
        ref: 'Content',
        required: [true, 'El id del contenido al cual se esta haciendo el comentario es requerido']
    },
    text: {
        type: String,
        required: [true, 'Es necesario el texto del comentario']
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now(),
        required: false
    }
});
module.exports = mongoose.model('Comment', commentSchema);