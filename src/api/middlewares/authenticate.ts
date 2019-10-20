import { Request, Response, NextFunction } from 'express';
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import NotAuthenticatedError from '../../core/errors/NotAuthenticatedError';

const secret = process.env.SECRET;

const handle = (): any => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            console.log('Hi tHEREee');

            let claims;
            const authorization = req.headers.authorization.split(' ');
            const authType = authorization[0];
            const authToken = authorization[1];
            console.log(authorization, authType, authToken);

            if (req.headers.authorization && authType.toLowerCase() === 'bearer') {
                claims = await authenticateBearerToken(authToken);
            } else {
                console.log('Hi tHERE');
                throw new NotAuthenticatedError('no authorization token found');
            }
            next();
        } catch (err) {
            // Catch and Propagate Token Error
            let _err: Error = null;
            if (err instanceof TokenExpiredError) {
                _err = new NotAuthenticatedError('provided token has expired', err);
            } else if (err instanceof NotBeforeError) {
                _err = new NotAuthenticatedError(`provided token cannot be used before ${err.date.toISOString()}`, err);
            } else {
                _err = new NotAuthenticatedError('provided token is invalid', err);
            }

            next(_err);
        }
    };
};

const authenticateBearerToken = async (token: string) => {
    return jwt.verify(
        token,
        secret,
        (err: any, decoded: any): any => {
            if (err) {
                return Promise.reject(err);
            }
            return decoded;
        }
    );
};

export default handle;
