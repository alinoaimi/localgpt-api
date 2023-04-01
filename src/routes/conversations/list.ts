import {SuperError} from "../../controllers/super_error";
import {responses} from "../../data/responses";

const router = require('express').Router();
let showValidationErrors = require('../../middlewere/showValidationErrors')


module.exports = function (app) {



    router.get('/', [], async (req, res, next) => {


        app.get('knex')('conversations').orderBy('id','DESC').then(rows => {
            res.json(rows);
        }).catch(error => {
            console.log(error);
            next(new SuperError(['database_error'], responses.INTERNAL));
        })

    })

    return router

};