import {check, checkSchema} from 'express-validator'
import {SuperError} from "../../controllers/super_error";
import {responses} from "../../data/responses";
var router = require('express').Router();
let showValidationErrors = require('../../middlewere/showValidationErrors');

module.exports = function (app) {

    // Create a user
    router.get('/:record_id', [
        check('record_id').exists(),
        showValidationErrors
    ], async (req, res, next) => {


        let conversation = null;

        await app.get('knex')('conversations')
            .where('id', req.params.record_id)
            .then(rows => {
                conversation = rows[0];
            }).catch(error => {
                console.log(error);
                next(new SuperError(['database_error'], responses.INTERNAL));
            });


        res.json(conversation);


    });

    return router

};