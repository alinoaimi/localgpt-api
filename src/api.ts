require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');

const app = express()
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const port = process.env.API_PORT || 1092


app.use(bodyParser.json())

let argv = require('minimist')(process.argv.slice(2));

// console.log(argv);

const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: argv['db'] || process.env.DATABASE_PATH || "database.db",
        // options: {
        //     nativeBinding: "database.db",
        // },
    },
});

app.set('knex',knex);
app.set('socketio', io);



// all routes
app.use('/', require('./routes')(app))

app.get('/ping', (req, res) => {
    res.json({
        success: true
    })
})


app.use(require('./middlewere/handleErrors'))

io.on('connection', (socket) => {
    console.log('a user connected');
});




server.listen(port, () => {
    console.log(`localgpt-api listening on port ${port}`)
})