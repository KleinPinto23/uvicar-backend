//Creación de Modelo Usuario
const { Schema, model } = require('mongoose');

const UnidadSchema = Schema({

    placa: {
        type: String,
        required: true,
        unique: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },

});

UnidadSchema.method('toJSON', function() {
    const{ __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Unidad', UnidadSchema );