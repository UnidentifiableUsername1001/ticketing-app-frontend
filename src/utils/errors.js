export class HttpError extends Error {
    constructor(status, message, data = null) {
        super(message);

        this.name = 'HttpError';

        this.status = status;
        this.data = data;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }
}