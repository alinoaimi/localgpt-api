import {check, checkSchema} from 'express-validator'
import {SuperError} from "../../controllers/super_error";
import {responses} from "../../data/responses";


var router = require('express').Router();
let showValidationErrors = require('../../middlewere/showValidationErrors')

module.exports = function (app) {



    // Create a user
    router.post('/', [check('conversation_id').exists(), check('author').isString().exists(), showValidationErrors], async (req, res, next) => {


        await app.get('knex')('messages').insert({
            conversation_id: req.body.conversation_id,
            text: req.body.text,
            author: req.body.author, // "computer" or "human"
            create_time: Date.now()
        }).then(result => {
            res.json({
                message_id: result[0],
            })
        }).catch(error => {
            next(new SuperError(['database_error'], responses.INTERNAL));
        })


    })

    return router

};