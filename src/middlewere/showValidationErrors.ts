import {validationResult} from "express-validator";

function showValidationErrors (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next()
}

module.exports = showValidationErrors;