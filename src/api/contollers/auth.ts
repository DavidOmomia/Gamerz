import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { ResourceNotFoundError, ConflictError, RequestValidationError } from '../../core/errors';

import validate from 'validate.js';
import * as check from '../../../services/User';

const constraints = {
    first_name: {
        presence: true,
        length: { maximum: 50 }
    },
    last_name: {
        presence: true,
        length: { maximum: 50 }
    },
    password: {
        presence: true,
        length: { minimum: 5, maximum: 20 }
    },
    email: {
        presence: true,
        email: true
    }
};
const constraints2 = {
    password: {
        presence: true,
        length: { minimum: 5, maximum: 20 }
    },
    email: {
        presence: true,
        email: true
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const newUser = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        const validation = validate({ ...newUser }, constraints);
        if (validation) {
            throw new RequestValidationError(validation);
        }
        const result = await check.checkEmail(req.body.email);
        if (result) {
            throw new ConflictError('That email already exists');
        }
        const user = await check.createUser({ ...newUser, password: bcrypt.hashSync(req.body.password, 12) });
        res.status(200).send({ message: 'User created successfully' });
    } catch (e) {
        next(e);
    }
};

export const logIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const validation = validate({ ...req.body }, constraints2);
        if (validation) {
            return res.status(400).send({ message: validation.password[0] });
        }
        const user = await check.checkEmail(req.body.email);
        console.log('pass user');
        if (!user) {
            throw new ResourceNotFoundError('The Email given does not exist');
        }
        const pass = await check.checkPassword(req.body.password, user);
        console.log('pass', pass.message);
        if (pass) {
            throw new RequestValidationError(pass.message);
        }
        const token = await check.validateToken(user);
        console.log('pass token');
        await delete user.password;
        return res.status(200).send({ auth: true, token: token, user: user, expiresIn: 86400 });
    } catch (err) {
        next(err);
    }
};
