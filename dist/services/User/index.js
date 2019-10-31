"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../src/core/models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.checkUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    if (username === null || username === undefined)
        throw new Error('No Username was passed as an argument');
    const user = yield models_1.default.User.findOne({
        where: { username }
    });
    if (user)
        return user;
    return false;
});
exports.checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email === null || email === undefined)
        throw new Error('No email was passed as an argument');
    const userEmail = yield models_1.default.User.findOne({
        where: { email }
    });
    if (userEmail)
        return userEmail;
    return false;
});
exports.createUser = (args) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield models_1.default.User.create({
        first_name: args.first_name,
        last_name: args.last_name,
        password: args.password,
        email: args.email
    });
    return user;
});
exports.checkPassword = (password, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let passwordIsValid = yield bcryptjs_1.default.compareSync(password, user.password);
        let message = 'Password not valid';
        if (!passwordIsValid) {
            throw new Error(message);
        }
        else {
            return false;
        }
    }
    catch (e) {
        return e;
    }
});
exports.validateToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 720 // expires in 12 minutes
    });
    yield user.save();
    return token;
});
exports.validateRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 3600 // expires in 1 hour
    });
    user.avatar = refreshToken;
    yield user.save();
    return refreshToken;
});
exports.generateNewToken = (refToken, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('refreshing token', user);
    if (user.avatar == refToken) {
        let token = yield exports.validateRefreshToken(user);
        return token;
    }
    else {
        throw new Error('Invalid refresh token providedd');
    }
});
