import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import NotAuthenticatedError from '../../tools/errors/NotAuthenticatedError';



const handle = (): any => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let claims: any = null
            const authorization = req.headers.authorization.split(' ')
            const authType = authorization[0]
            const authToken = authorization[1]

            if (req.headers.authorization && authType.toLowerCase() === 'bearer') {
                claims = await authenticateBearerToken(authToken);
            }
            else {
                throw new NotAuthenticatedError('no authorization token found');
            }

         

            next();

        }
        catch (err) {
            // Catch and Propagate Token Error
            let _err: Error = null
            if (err instanceof TokenExpiredError) {
                _err = new NotAuthenticatedError('provided token has expired', err);
            } else if (err instanceof NotBeforeError) {
                _err = new NotAuthenticatedError(`provided token cannot be used before ${err.date.toISOString()}`, err);
            } else {
                _err = new NotAuthenticatedError('provided token is invalid', err);
            }

            next(_err)
        }


    };
};


const authenticateBearerToken = async (token: string) => {
    const publicKey = fs.readFileSync('./oauth-public.key');
    return jwt.verify(token, publicKey, (err: any, decoded: any): any => {
        if (err) {
            return Promise.reject(err);
        }
        return decoded;
    });
}

export default handle;
