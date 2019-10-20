import express from 'express';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import DomainError from '../../core/errors/DomainError';
import logger from '../../tools/logger';

function handle (_err: Error, req: express.Request, res: express.Response, _next: express.NextFunction): any {
    // logger.error(_err);
    if (_err instanceof DomainError) {
        const err = _err as DomainError;

        const errorData = {
            status: err.getStatus(),
            error: err.getName(),
            message: err.message,
            data: {}
        };

        if (err.getData() !== undefined) {
            errorData.data = err.getData();
        }

        res.status(_err.getHttpCode()).send(errorData);
    } else if (_err instanceof ValidationError) {
        const errorData = {
            status: false,
            error: '',
            message: '',
            data: {}
        };
        const httpCode = 400;

        errorData.error = 'validation_error';
        errorData.message = 'the provided payload was not valid';

        const data: { [key: string]: any[] } = {};
        const err = _err as ValidationError;

        err.errors.forEach(
            (validationErrorItem: ValidationErrorItem): void => {
                const itemErrors = [];
                itemErrors.push(validationErrorItem.message);

                data[validationErrorItem.path] = itemErrors;
            }
        );

        errorData.data = data;
        res.status(httpCode).send(errorData);
    } else {
        logger.error('Something has gone wrong. Unhandled error', _err);

        res.status(500).send({
            status: false,
            message: 'Internal server error. It would be nice if you report this to us.',
            data: null
        });
    }
}

export default handle;
