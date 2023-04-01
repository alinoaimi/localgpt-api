require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.API_PORT || 8190


app.use(bodyParser.json())

const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: "database.db",
        // options: {
        //     nativeBinding: "database.db",
        // },
    },
});

app.set('knex',knex);



// all routes
app.use('/', require('./routes')(app))


app.use(require('./middlewere/handleErrors'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})