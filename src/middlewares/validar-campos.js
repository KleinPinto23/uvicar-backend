const { validationResult } = require("express-validator");

const validarCampos = ( req, res, next ) => { //Next es una función que hay que llamar en caso todo esté OK para seguir con el siguiente middleware

    const errores = validationResult( req );

    if( !errores.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        })
    }

    next();

}


module.exports = {
    validarCampos
}