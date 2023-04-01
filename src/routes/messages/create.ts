import {check, checkSchema} from 'express-validator'
import {SuperError} from "../../controllers/super_error";
import {responses} from "../../data/responses";
import {EngineInterface} from "../../engines/EngineInterface";

var router = require('express').Router();
let showValidationErrors = require('../../middlewere/showValidationErrors')

module.exports = function (app) {



    // Create a user
    router.post('/', [check('conversation_id').exists(), check('author').isString().exists(), showValidationErrors], async (req, res, next) => {


        // check if the relevant interface is running, for now it's just gpt4all, so I'm not going to check

        let conversationMemoryLabel = 'conversation_'+req.body.conversation_id;

        if(app.get(conversationMemoryLabel) == null) {
            let engineInterface = new EngineInterface(conversationMemoryLabel);
            engineInterface.updatesEmitter.on('state', data => {
                console.log('STATE: '+data);
            })
            engineInterface.updatesEmitter.on('typing', data => {
                console.log('TYPING: '+data);
            })
            engineInterface.updatesEmitter.on('final_message', async data => {
                console.log('FINAL_MESSAGE: '+data);
                if(data != null && data != undefined) {
                    data = data.replace('[1m[32m[0m', '');

                    await app.get('knex')('messages').insert({
                        conversation_id: req.body.conversation_id,
                        text: data.toString(),
                        author: 'computer', // "computer" or "human"
                        create_time: Date.now()
                    }).then(result => {
                        console.log('computer message inserted: id: '+result[0]);
                    }).catch(error => {
                        next(new SuperError(['database_error'], responses.INTERNAL));
                    });
                }
            })

            app.set(conversationMemoryLabel, engineInterface);
        }

        let engine = app.get(conversationMemoryLabel);



        await app.get('knex')('messages').insert({
            conversation_id: req.body.conversation_id,
            text: req.body.text,
            author: req.body.author, // "computer" or "human"
            create_time: Date.now()
        }).then(result => {
            res.json({
                message_id: result[0],
            });
            engine.queueMessage(req.body.text);
        }).catch(error => {
            next(new SuperError(['database_error'], responses.INTERNAL));
        });


    })

    return router

};