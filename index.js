// create the express server here
require('dotenv').config()

const client = require('./db/client')
client.connect()

const { PORT = 3000 } = process.env
const express = require('express')
const server = express();

const cors = require('cors')

server.use(cors())

server.get('/', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

server.listen(PORT, () => {
    console.log('CORS-enabled web server listening on port', PORT)
});

const apiRouter = require('./api')
server.use('/api', apiRouter)

const morgan = require('morgan')
server.use(morgan('dev'))

server.use(express.json())