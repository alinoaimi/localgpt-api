import {ResponseInterface, responses} from '../data/responses'


export class SuperError extends Error {



    constructor(errors: string[], response?: ResponseInterface, message_human_language?: string) {
        super('error');



        this['errors'] = errors;
        this['response'] = response;
        if(message_human_language != null) {

            this['message_human_language'] = message_human_language;

        }


        // Set the prototype explicitly.
        // Object.setPrototypeOf(this, FooError.prototype);
    }

    // sayHello() {
    //     return "hello " + this.message;
    // }
}

