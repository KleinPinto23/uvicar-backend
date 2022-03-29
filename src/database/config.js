const mongoose = require('mongoose');



const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CNN_STRING, { //El await indica que debe esperar respuesta a la conexión
            /*useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true*/ //No necesarios desde la versión 6
        });

        console.log('UVICAR en línea');

        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos de UVICAR - vea logs');
    }

}


module.exports = {
    dbConnection
}