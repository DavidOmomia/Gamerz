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
const models_1 = __importDefault(require("../../models"));
exports.checkUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    if (username === null || username === undefined)
        throw new Error('No Username was passed as ana argument');
    const user = yield models_1.default.User.findOne({
        where: { username }
    });
    if (user)
        return user;
    return false;
});
exports.checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('checking for email', email);
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
