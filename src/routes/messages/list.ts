import {SuperError} from "../../controllers/super_error";
import {responses} from "../../data/responses";
import {check} from "express-validator";

const router = require('express').Router();
let showValidationErrors = require('../../middlewere/showValidationErrors')
const QueryTranslate = require('query_translate')


module.exports = function (app) {



    router.get('/', [check('conversation_id').exists()], async (req, res, next) => {


        let translatedQuery = QueryTranslate.translate({
            format: 'knex', // format can be one of 'sql', 'knex' or 'easy'
            knex: app.get('knex'), // if the format is set to knex, pass your knex variable here
            query: req.query,
            tableName: 'messages' // table name,
        });

        translatedQuery.then(rows => {
            res.json(rows);
        }).catch(error => {
            console.log(error);
            next(new SuperError(['database_error'], responses.INTERNAL));
        })

    })

    return router

};