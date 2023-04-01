
var router = require('express').Router();

module.exports = function (app) {

    // CREATE CONVERSATION ROUTE
    router.post('/', require('./create')(app))
    router.get('/', require('./list')(app))






    return router

};