import {SuperError} from '../controllers/super_error'
import {responses} from '../data/responses'

function handleErrors(error, req, res, next) {

    let returnData = {}


    console.log('somos aqui');

    try {
        if (error instanceof SuperError) {
            console.log('it is instance of SuperError')
            returnData['message'] = error['message'];
            returnData['errors'] = error['errors'];
            returnData['message_human_language'] = error['message_human_language'];


            if (error['response'] != null) {
                returnData['message'] = error['response']['message'];
                res.status(error['response']['httpStatus'])
            }
        } else {
            console.log('it is not an instance if SuperError')
            console.log(error);
            returnData['message'] = 'error';
            res.status(responses.INTERNAL.httpStatus)
        }
    } catch (ex) {
        // TODO log the stuff that happens below
        console.log(`error at handleError: ${ex}`);
    }

    res.json(returnData);
}

module.exports = handleErrors;