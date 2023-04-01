"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperError = void 0;
class SuperError extends Error {
    constructor(errors, response, message_human_language) {
        super('error');
        this['errors'] = errors;
        this['response'] = response;
        if (message_human_language != null) {
            this['message_human_language'] = message_human_language;
        }
        // Set the prototype explicitly.
        // Object.setPrototypeOf(this, FooError.prototype);
    }
}
exports.SuperError = SuperError;
