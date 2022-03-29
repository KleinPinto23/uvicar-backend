//Creación de Modelo Usuario
const { Schema, model } = require('mongoose');

const MenuSchema = Schema({

    menu: {
        type: String,
        required: true,
        unique: true
    },
    enlace: {
        type: String,
        required: true
    },

});

MenuSchema.method('toJSON', function() {
    const{ __v, _id, ...object } = this.toObject();
    
    object.uid = _id;

    return object;
});

module.exports = model( 'Menu', MenuSchema );