import db from '../../src/core/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const checkUsername = async (username: String): Promise<any> => {
    if (username === null || username === undefined) throw new Error('No Username was passed as an argument');
    const user = await db.User.findOne({
        where: { username }
    });
    if (user) return user;
    return false;
};

export const checkEmail = async (email: string): Promise<any> => {
    console.log('checking for email', email);
    if (email === null || email === undefined) throw new Error('No email was passed as an argument');
    const userEmail = await db.User.findOne({
        where: { email }
    });
    if (userEmail) return userEmail;
    return false;
};

export const createUser = async (args: any): Promise<any> => {
    let user = await db.User.create({
        first_name: args.first_name,
        last_name: args.last_name,
        password: args.password,
        email: args.email
    });

    return user;
};

export const checkPassword = async (password: any, user: any): Promise<any> => {
    try {
        let passwordIsValid = await bcrypt.compareSync(password, user.password);
        console.log(user.password);
        let message = 'Password not valid';
        if (!passwordIsValid) {
            throw new Error(message);
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
};

export const validateToken = async (user: any): Promise<any> => {
    let token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
    return token;
};
