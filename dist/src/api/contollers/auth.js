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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../../core/errors");
const valid = __importStar(require("../../core/utilities"));
// const nexmo = new Nexmo({
//     apiKey: 'a55207d0',
//     apiSecret: 'od4Sd80hpb1IT2no'
// })
const emitter_1 = __importDefault(require("../../core/events/emitter"));
const validate_js_1 = __importDefault(require("validate.js"));
const check = __importStar(require("../../../services/User"));
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        const validation = validate_js_1.default(Object.assign({}, newUser), valid.constraints);
        if (validation) {
            throw new errors_1.RequestValidationError(validation);
        }
        const result = yield check.checkEmail(req.body.email);
        if (result) {
            throw new errors_1.ConflictError('That email already exists');
        }
        const user = yield check.createUser(Object.assign(Object.assign({}, newUser), { password: bcryptjs_1.default.hashSync(req.body.password, 12) }));
        emitter_1.default.emit('user:created', user);
        const token = yield check.validateToken(user);
        const refreshToken = yield check.validateRefreshToken(user);
        return res.status(200).send({ message: 'User created successfully', token, refresh_token: refreshToken, expires_in: 3600 });
    }
    catch (e) {
        next(e);
    }
});
//Refresh token
exports.logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = validate_js_1.default(Object.assign({}, req.body), valid.constraints2);
        if (validation) {
            throw new errors_1.RequestValidationError(validation.password[0]);
        }
        const user = yield check.checkEmail(req.body.email);
        if (!user) {
            throw new errors_1.ResourceNotFoundError('The Email given does not exist');
        }
        const pass = yield check.checkPassword(req.body.password, user);
        if (pass) {
            throw new errors_1.RequestValidationError(pass.message);
        }
        const token = yield check.validateToken(user);
        const refreshToken = yield check.validateRefreshToken(user);
        emitter_1.default.emit('user:logged_in'); //EMTIIING
        return res.status(200).send({ auth: true, access_token: token, refresh_token: refreshToken, expires_in: 3600 });
    }
    catch (err) {
        next(err);
    }
});
exports.getToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = res.locals.client;
        const response = yield check.generateNewToken(req.body.refresh_token, user);
        const token = yield check.validateToken(user);
        res.status(200).send({ refresh_token: response, access_token: token, expires_in: 3600 });
    }
    catch (e) {
        next(e);
    }
});
exports.getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let client = res.locals.client;
        let profile = {
            first_name: client.first_name,
            last_name: client.last_name,
            username: client.username,
            avatar: client.avatar,
            email: client.email,
            phone: client.phone
        };
        return res.status(200).send({ profile });
    }
    catch (e) {
        next(e);
    }
});
exports.passwordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = validate_js_1.default(Object.assign({}, req.body), valid.constraints3);
        if (validation) {
            throw new errors_1.RequestValidationError(validation.password);
        }
        let client = res.locals.client;
        const pass = yield check.checkPassword(req.body.password, client);
        if (pass) {
            throw new errors_1.RequestValidationError(pass.message);
        }
        const newPass = {
            password: req.body.newpassword
        };
        const isDuplicate = yield check.checkPassword(req.body.password, newPass);
        if (isDuplicate === false) {
            throw new errors_1.ConflictError('Please change your password');
        }
        client.password = bcryptjs_1.default.hashSync(req.body.newpassword, 12);
        const result = yield client.save();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let client = res.locals.client;
        const updatedData = req.body;
        client.username = updatedData.username;
        let result = yield client.save();
        res.send(result);
    }
    catch (e) {
        next(e);
    }
});
