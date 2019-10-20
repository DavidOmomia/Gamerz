import DomainError from './DomainError';

export default class BadRequestError extends DomainError {
    protected error_name: string = 'bad_request';
    protected httpCode: number = 400;

    constructor (message: string = 'invalid data provided for the request', error: Error = undefined, data: any = null) {
        super(message, error, data);
        Error.captureStackTrace(this, this.constructor);
    }
}
