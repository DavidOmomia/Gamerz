import { Request, Response, NextFunction } from 'express';
import NotAuthorizedError from '../../core/errors/NotAuthorizedError';

const isAdmin = (): any => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let admin = res.locals.client;
            if (admin.email !== 'test@gmail.com') {
                throw new NotAuthorizedError('You do not have admin privileges');
            }
            next();
        } catch (e) {
            let _err: Error = null;
            _err = new NotAuthorizedError('You do not have admin privileges');
            next(_err);
        }
    };
};

export default isAdmin;
