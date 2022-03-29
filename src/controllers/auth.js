//Controladores son funciones comunes

const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario'); //U mayúscula porque este modelo me va a permitir instancias de mi modelo
const Unidad = require('../models/unidad');
const Menu = require('../models/menu');

const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = response ) => { //Asíncrono porque la petición a BD se hace de esa manera
    
    try {

        const{ email, password } = req.body;

        //Verificar que correo no existe
        const existeEmail = await Usuario.findOne({ email }); //Validamos si existe un email, sería "email: email" pero simplificamos
        
        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario( req.body );
        
        
        //TODO: Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        //GUARDAR USUARIO EN BD        
        await usuario.save();

        //GENERAR JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }   


}



const crearUnidad = async( req, res = response ) => { //Asíncrono porque la petición a BD se hace de esa manera
    
    try {

        const{ placa } = req.body;

        //Verificar que correo no existe
        const existePlaca = await Unidad.findOne({ placa });
        
        if( existePlaca ){
            return res.status(400).json({
                ok: false,
                msg: 'La unidad ya existe'
            });
        }

        const unidad = new Unidad( req.body );
                
        //GUARDAR UNIDAD EN BD        
        await unidad.save();

        res.json({
            ok: true,
            unidad
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador. RegistrarUnidad.'
        });
    }   


}



const crearMenu = async( req, res = response ) => { //Asíncrono porque la petición a BD se hace de esa manera

    console.log('Llega a la funcion crearMenu')
    
    try {

        const{ menu } = req.body;

        //Verificar que correo no existe
        const existeMenu = await Menu.findOne({ menu });
        
        if( existeMenu ){
            return res.status(400).json({
                ok: false,
                msg: 'El menú ya existe'
            });
        }

        const optMenu = new Menu( req.body );
                
        //GUARDAR UNIDAD EN BD        
        await optMenu.save();

        res.json({
            ok: true,
            optMenu
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador. IngresarMenu.'
        });
    }   


}




const login = async( req, res ) => {

    const { email, password } = req.body;

    try {

        //Verificar si existe el correo
        const usuarioDB = await Usuario.findOne({ email });
        if( !usuarioDB ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Validar el password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'Password no es correcto'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })


    } catch ( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de login. Hable con el administrador'
        });
    }

}



const renewToken = async(req, res) => {

    const uid = req.uid;
    
    //Generar un nuevo JWT
    const token = await generarJWT( uid );

    //Obtener usuario por uid
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        usuario,
        token        
    });

}


module.exports = {
    crearUsuario,
    crearUnidad,
    crearMenu,
    login,
    renewToken
}