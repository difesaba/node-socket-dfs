require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {}

        //Middlewares funcion q se ejecuta cuando se levanta el servidor
        this.middlewares();
        //Rutas aplicacion
        this.routes();

        //Configuracion Sockets
        this.sockets();
    }


    middlewares() {
        //Cors
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on("connection", socketController);
    }

    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }

}

module.exports = Server;