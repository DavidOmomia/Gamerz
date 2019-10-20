import DomainError from './DomainError';

export default class ConflictError extends DomainError {
    protected error_name: string = 'conflict';
    protected httpCode: number = 409;

    constructor (
        message: string = 'The request could not be completed due to a conflict with the current state of the target resource',
        error: Error = undefined,
        data: any = null
    ) {
        super(message, error, data);
        Error.captureStackTrace(this, this.constructor);
    }
}
