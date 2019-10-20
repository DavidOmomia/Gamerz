import express, { Request, Response } from 'express';
import authentication from '../middlewares/authenticate';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const newUser = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        const validation = validate({ ...newUser }, constraints);
        if (validation) {
            return res.status(400).send({ errorV: validation });
        }
        const result = await check.checkEmail(req.body.email);
        if (result) {
            return res.status(400).send({ error: 'email already taken', user: result });
        }
        const user = await check.createUser({ ...newUser, password: bcrypt.hashSync(req.body.password, 12) });
        res.status(200).send(user);
    } catch (e) {
        console.log(e);
    }
};

export const logIn = async (req: Request, res: Response): Promise<any> => {
    try {
        const validation = validate({ ...req.body }, constraints2);
        if (validation) {
            return res.status(400).send({ errorV: validation });
        }
        const user = await check.checkEmail(req.body.email);
        console.log('pass user');
        if (!user) {
            return res.status(400).send('The email given does not exist');
        }
        const pass = await check.checkPassword(req.body.password, user);
        console.log('pass', pass);
        // if(pass){
        //     return res.status(400).send({message:pass})
        // }
        const token = await check.validateToken(user);
        console.log('pass token');
        res.status(200).send({ auth: true, token: token, user: user, expiresIn: 86400 });
    } catch (e) {
        return res.status(400).send({ error: e });
    }
};
