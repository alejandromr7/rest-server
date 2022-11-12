const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.host = process.env.HOST;

        this.middlewares();
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api', require('./routes/UsuarioRoutes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`http://${this.host}:${this.port}`);
        });
    }

}

module.exports = Server;