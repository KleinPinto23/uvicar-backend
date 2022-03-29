/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

//Controladores
const { crearUsuario, crearMenu, login, renewToken, crearUnidad } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


/*** DEFINIENDO ENDPOINTS ***/

//Crear nuevos usuarios
router.post( '/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario );


router.post( '/nuevaUnidad', [
    check('placa', 'El nombre es obligatorio').not().isEmpty(),
    check('marca', 'El nombre es obligatorio').not().isEmpty(),
    check('modelo', 'El nombre es obligatorio').not().isEmpty(),
    check('cliente', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearUnidad );


router.post( '/nuevoMenu', [
    check('menu', 'El nombre es obligatorio').not().isEmpty(),
    check('enlace', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearMenu );

/*
    nombre: string
    pass: string
    email: isEmail
*/


//LOGIN
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

//Revalidar Token
router.get( '/renew', validarJWT, renewToken); //Como validarJWT solo es un middleware no es necesario poner corchetes


module.exports = router;