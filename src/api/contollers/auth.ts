import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { ResourceNotFoundError, ConflictError, RequestValidationError } from '../../core/errors';
import * as valid from '../../core/utilities';
import Nexmo from 'nexmo';
// const nexmo = new Nexmo({
//     apiKey: 'a55207d0',
//     apiSecret: 'od4Sd80hpb1IT2no'
// })

import emitter from '../../core/events/emitter';

import validate from 'validate.js';
import * as check from '../../../services/User';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const newUser = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        const validation = validate({ ...newUser }, valid.constraints);
        if (validation) {
            throw new RequestValidationError(validation);
        }
        const result = await check.checkEmail(req.body.email);
        if (result) {
            throw new ConflictError('That email already exists');
        }
        const user = await check.createUser({ ...newUser, password: bcrypt.hashSync(req.body.password, 12) });
        emitter.emit('user:created', user, req.headers.authorization);
        const token = await check.validateToken(user);
        return res.status(200).send({ message: 'User created successfully', user, token, expiresIn: 86400 });
    } catch (e) {
        next(e);
    }
};

export const logIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const validation = validate({ ...req.body }, valid.constraints2);
        if (validation) {
            throw new RequestValidationError(validation.password[0]);
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
        console.log('emitting');
        emitter.emit('user:logged_in'); //EMTIIING
        // const from = 'Nexmo';
        // const to = '2349018913201';
        // const text = 'It Works';

        // nexmo.message.sendSms(from, to, text);
        return res.status(200).send({ auth: true, token, user, expiresIn: 86400 });
    } catch (err) {
        next(err);
    }
};

export const passwordReset = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const validation = validate({ ...req.body }, valid.constraints3);
        if (validation) {
            throw new RequestValidationError(validation.password);
        }
        let client = res.locals.client;
        const pass = await check.checkPassword(req.body.password, client);
        if (pass) {
            throw new RequestValidationError(pass.message);
        }
        const newPass = {
            password: req.body.newpassword
        };
        const isDuplicate = await check.checkPassword(req.body.password, newPass);
        if (isDuplicate === false) {
            throw new ConflictError('Please change your password');
        }
        client.password = bcrypt.hashSync(req.body.newpassword, 12);
        const result = await client.save();
        res.send(result);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        let client = res.locals.client;
        const updatedData = req.body;
        client.username = updatedData.username;
        let result = await client.save();
        res.send(result);
    } catch (e) {
        next(e);
    }
};
