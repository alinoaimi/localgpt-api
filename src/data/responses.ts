export const enum ResponseType {
    SUCCESS,
    WARNING,
    ERROR
}

export interface ResponseInterface {
    httpStatus: number,
    type: ResponseType,
    message?: string
}

export const responses = {

    SUCCESS: {
        httpStatus: 200,
        type: ResponseType.SUCCESS
    },
    CREATED: {
        httpStatus: 201,
        type: ResponseType.SUCCESS
    },
    UNAUTHENTICATED: {
        httpStatus: 401,
        message: "Authentication required",
        type: ResponseType.ERROR
    },
    PERMISSION_DENIED: {
        httpStatus: 403,
        message: "Permission denied",
        type: ResponseType.ERROR
    },
    NOT_FOUND: {
        httpStatus: 404,
        message: "Not found",
        type: ResponseType.ERROR
    },
    ALREADY_EXISTS: {
        httpStatus: 409,
        message: "Already exists",
        type: ResponseType.ERROR
    },
    OUT_OF_RANGE: {
        httpStatus: 400,
        message: "Out of range",
        type: ResponseType.ERROR
    },
    INVALID_ARGUMENT: {
        httpStatus: 400,
        message: "Invalid argument",
        type: ResponseType.ERROR
    },
    DEADLINE_EXCEEDED: {
        httpStatus: 504,
        message: "Deadline exceeded",
        type: ResponseType.ERROR
    },
    INTERNAL: {
        httpStatus: 500,
        message: "Error",
        type: ResponseType.ERROR
    }

};

