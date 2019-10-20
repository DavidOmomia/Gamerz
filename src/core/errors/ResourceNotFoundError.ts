import DomainError from './DomainError';

export default class ResourceNotFoundError extends DomainError {
    protected error_name: string = 'not_found';
    protected httpCode: number = 404;

    constructor (message: string = 'resource not found', error: Error = undefined, data: any = null) {
        super(message, error, data);
        Error.captureStackTrace(this, this.constructor);
    }
}
