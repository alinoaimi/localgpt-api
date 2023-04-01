import {check, checkSchema} from 'express-validator'
import {SuperError} from "../../controllers/super_error";
import {responses} from "../../data/responses";


var router = require('express').Router();
let showValidationErrors = require('../../middlewere/showValidationErrors')

module.exports = function (app) {



    // Create a conversation
    router.post('/', [showValidationErrors], async (req, res, next) => {


        await app.get('knex')('conversations').insert({
            title: 'new conversation',
            create_time: Date.now()
        }).then(result => {
            res.json({
                conversation_id: result[0],
                title: 'new conversation'
            });



        }).catch(error => {
            next(new SuperError(['database_error'], responses.INTERNAL));
        })


    })

    return router

};