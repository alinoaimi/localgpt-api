"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const super_error_1 = require("../controllers/super_error");
const responses_1 = require("../data/responses");
function handleErrors(error, req, res, next) {
    let returnData = {};
    try {
        if (error instanceof super_error_1.SuperError) {
            returnData['message'] = error['message'];
            returnData['errors'] = error['errors'];
            returnData['message_human_language'] = error['message_human_language'];
            if (error['response'] != null) {
                returnData['message'] = error['response']['message'];
                res.status(error['response']['httpStatus']);
            }
        }
        else {
            console.log(error);
            returnData['message'] = 'error';
            res.status(responses_1.responses.INTERNAL.httpStatus);
        }
    }
    catch (ex) {
        // TODO log the stuff that happens below
    }
    res.json(returnData);
}
module.exports = handleErrors;
