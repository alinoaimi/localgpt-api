require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.API_PORT || 8190;
const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: "database.db",
        // options: {
        //     nativeBinding: "database.db",
        // },
    },
});
// all routes
app.use('/', require('./routes')(app));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
