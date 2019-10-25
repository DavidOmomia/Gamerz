import { Request, Response, NextFunction } from 'express';
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import NotAuthenticatedError from '../../core/errors/NotAuthenticatedError';
import models from '../../core/models';

const secret = process.env.SECRET;

const handle = (): any => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let claims: any;
            const authorization = req.headers.authorization.split(' ');
            const authType = authorization[0];
            const authToken = authorization[1];

            if (req.headers.authorization && authType.toLowerCase() === 'bearer') {
                claims = await authenticateBearerToken(authToken);
            } else {
                throw new NotAuthenticatedError('no authorization token found');
            }
            /**
             * Use the aud claim to get the client form DB. Check client status and availabilty too
             */
            const client = await models.User.findOne({
                where: {
                    id: claims.id
                }
            });
            res.locals.claims = claims;
            res.locals.client = client;
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
                console.log('auth error', err);
                return Promise.reject(err);
            }
            console.log(decoded);
            return decoded;
        }
    );
};

export default handle;
