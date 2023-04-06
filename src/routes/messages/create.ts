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

        const convoId = req.body.conversation_id;

        let conversation = null;

        await app.get('knex')('conversations')
            .where('id', convoId)
            .then(rows => {
                conversation = rows[0];
            }).catch(error => {
                console.log(error);
                next(new SuperError(['database_error'], responses.INTERNAL));
            });


        let conversationMemoryLabel = 'conversation_'+convoId;

        if(app.get(conversationMemoryLabel) == null) {
            let engineInterface = new EngineInterface(conversationMemoryLabel, conversation['model_path']);

            app.get('socketio').emit(conversationMemoryLabel+'_status', 'booting_engine');

            engineInterface.updatesEmitter.on('state', data => {
                console.log('STATE: '+data);
                app.get('socketio').emit(conversationMemoryLabel+'_status', data);

            })
            engineInterface.updatesEmitter.on('typing', data => {
                console.log('TYPING: '+data);
                app.get('socketio').emit(conversationMemoryLabel+'_typing', data);
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
                    }).then(async result => {
                        console.log('computer message inserted: id: '+result[0]);


                        await app.get('knex')('messages')
                            .where('id', result[0])
                            .then(rows => {
                                app.get('socketio').emit(conversationMemoryLabel+'_new_message', rows[0]);
                                app.get('socketio').emit('ui_action', 'refresh_conversations_list');
                            }).catch(error => {
                                console.log(error);
                            });



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

            app.get('knex')('messages')
                .where('id', result[0])
                .then(rows => {
                    app.get('socketio').emit(conversationMemoryLabel+'_new_message', rows[0]);
                    app.get('socketio').emit('ui_action', 'refresh_conversations_list');
                }).catch(error => {
                    console.log(error);
                });


        }).catch(error => {
            next(new SuperError(['database_error'], responses.INTERNAL));
        });


    })

    return router

};