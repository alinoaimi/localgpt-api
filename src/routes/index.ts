var router = require('express').Router();


module.exports = function (app) {


    router.get('/', (req, res) => {
        res.send("hello world, test");
    });

    // conversations master route
    router.use('/conversations', require('./conversations')(app));
    router.use('/messages', require('./messages')(app));



    return router

};