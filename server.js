const http = require('http');
const dotenv = require('dotenv').config();

const dbConnection = require('./config/db');

const app = require('./app')

const server = http.createServer(app)

PORT = process.env.PORT || 4000

const start = async () => {

   await dbConnection();

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
};


start();