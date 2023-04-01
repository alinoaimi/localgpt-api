"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = void 0;
exports.responses = {
    SUCCESS: {
        httpStatus: 200,
        type: 0 /* ResponseType.SUCCESS */
    },
    CREATED: {
        httpStatus: 201,
        type: 0 /* ResponseType.SUCCESS */
    },
    UNAUTHENTICATED: {
        httpStatus: 401,
        message: "Authentication required",
        type: 2 /* ResponseType.ERROR */
    },
    PERMISSION_DENIED: {
        httpStatus: 403,
        message: "Permission denied",
        type: 2 /* ResponseType.ERROR */
    },
    NOT_FOUND: {
        httpStatus: 404,
        message: "Not found",
        type: 2 /* ResponseType.ERROR */
    },
    ALREADY_EXISTS: {
        httpStatus: 409,
        message: "Already exists",
        type: 2 /* ResponseType.ERROR */
    },
    OUT_OF_RANGE: {
        httpStatus: 400,
        message: "Out of range",
        type: 2 /* ResponseType.ERROR */
    },
    INVALID_ARGUMENT: {
        httpStatus: 400,
        message: "Invalid argument",
        type: 2 /* ResponseType.ERROR */
    },
    DEADLINE_EXCEEDED: {
        httpStatus: 504,
        message: "Deadline exceeded",
        type: 2 /* ResponseType.ERROR */
    },
    INTERNAL: {
        httpStatus: 500,
        message: "Error",
        type: 2 /* ResponseType.ERROR */
    }
};
