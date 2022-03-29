//Creación de Modelo Mensaje
const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({

    de: { //Persona que manda el mensaje
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: { //Persona que recibe el mensaje
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },

},{
    timestamps: true //Le adiciona fecha de creación y de última modificación
});

MensajeSchema.method('toJSON', function() {
    const{ __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Mensaje', MensajeSchema );