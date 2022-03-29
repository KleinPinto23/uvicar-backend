const { usuarioConectado, usuarioDesconectado, getUsuarios, getUnidades, getMenus, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;
        this.socketEvents();

    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {

            const[ valido, uid ] = comprobarJWT( socket.handshake.query[ 'x-token' ] );

            if( !valido ){
                console.log('Socket no identificado');
                return socket.disconnect();
            }
            
            await usuarioConectado( uid );

            //Unir al usuario a una sala de socket.io
            socket.join( uid ); //UID de Mongo

            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar
        
            // TODO: Saber qué usuario está ativo mediante el UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios', await getUsuarios() );

            // TODO: Emitir todas las unidades conectadas
            this.io.emit( 'lista-unidades', await getUnidades() );

            // TODO: Emitir todas las unidades conectadas
            this.io.emit( 'lista-menus', await getMenus() );

            // TODO: Socket join (Unir un usuario a una sala en particular)

            // TODO: Escuchar cuando el cliente manda un mensaje
            socket.on( 'mensaje-personal', async( payload ) => {
                const mensaje = await grabarMensaje( payload );
                this.io.to( payload.para ).emit( 'mensaje-personal', mensaje );
                this.io.to( payload.de ).emit( 'mensaje-personal', mensaje );
            });


            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconectó
            // TODO: Emitir todos los usuarios conectados.

            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
                this.io.emit( 'lista-usuarios', await getUsuarios() );
            })

        });
    }


}


module.exports = Sockets;