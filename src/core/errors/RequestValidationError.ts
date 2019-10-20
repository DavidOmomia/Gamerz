import DomainError from './DomainError';

export default class RequestValidationError extends DomainError {
    protected error_name: string = 'validation_error';
    protected httpCode: number = 422;

    constructor (message: string = 'invalid data provided for the request', error: Error = undefined, data: any = null) {
        super(message, error, data);
        Error.captureStackTrace(this, this.constructor);
    }
}
