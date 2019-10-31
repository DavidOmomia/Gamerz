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
        expiresIn: 720 // expires in 12 minutes
    });
    await user.save();
    return token;
};

export const validateRefreshToken = async (user: any): Promise<any> => {
    let refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 3600 // expires in 1 hour
    });
    user.avatar = refreshToken;
    await user.save();
    return refreshToken;
};

export const generateNewToken = async (refToken: any, user: any): Promise<any> => {
    console.log('refreshing token', user);
    if (user.avatar == refToken) {
        let token = await validateRefreshToken(user);
        return token;
    } else {
        throw new Error('Invalid refresh token providedd');
    }
};
