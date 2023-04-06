import {SuperError} from "../../controllers/super_error";
import {responses} from "../../data/responses";

const router = require('express').Router();
let showValidationErrors = require('../../middlewere/showValidationErrors')


module.exports = function (app) {



    router.get('/', [], async (req, res, next) => {


        app.get('knex')('conversations').orderBy('id','DESC').then(async rows => {

            let finalConvos = [];
            // I know that this is not an ideal way to do it, using joins is better, but I'll do it like that anyway because I like how it looks and it wont have impact on performance on such a small scale.
            for(const conversation of rows) {
                let last_message = null;

                await app.get('knex')('messages')
                    .where('conversation_id', conversation['id'])
                    .orderBy('id', 'DESC')
                    .limit(1)
                    .then(rows => {
                        last_message = rows[0]
                    })
                    .catch(error => {
                        console.log(error);
                    });

                conversation['last_message'] = last_message;
                finalConvos.push(conversation);

            }

            finalConvos.sort(function(a, b){
                let convoA = 0;
                let convoB = 0;

                if(a['last_message'] != null) {
                    convoA = a['last_message']['create_time'];
                } else {
                    convoA = a['create_time'];

                }
                if(b['last_message'] != null) {
                    convoB = b['last_message']['create_time'];
                } else {
                    convoB = b['create_time'];
                }


                return convoB - convoA;
            });

            res.json(finalConvos);
        }).catch(error => {
            console.log(error);
            next(new SuperError(['database_error'], responses.INTERNAL));
        })

    })

    return router

};