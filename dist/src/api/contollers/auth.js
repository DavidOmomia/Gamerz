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
const validate_js_1 = __importDefault(require("validate.js"));
const check = __importStar(require("../../../services/User"));
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
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        const validation = validate_js_1.default(Object.assign({}, newUser), constraints);
        if (validation) {
            throw new errors_1.RequestValidationError(validation);
        }
        const result = yield check.checkEmail(req.body.email);
        if (result) {
            throw new errors_1.ConflictError('That email already exists');
        }
        const user = yield check.createUser(Object.assign(Object.assign({}, newUser), { password: bcryptjs_1.default.hashSync(req.body.password, 12) }));
        res.status(200).send({ message: 'User created successfully' });
    }
    catch (e) {
        next(e);
    }
});
exports.logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = validate_js_1.default(Object.assign({}, req.body), constraints2);
        if (validation) {
            return res.status(400).send({ message: validation.password[0] });
        }
        const user = yield check.checkEmail(req.body.email);
        console.log('pass user');
        if (!user) {
            throw new errors_1.ResourceNotFoundError('The Email given does not exist');
        }
        const pass = yield check.checkPassword(req.body.password, user);
        console.log('pass', pass.message);
        if (pass) {
            throw new errors_1.RequestValidationError(pass.message);
        }
        const token = yield check.validateToken(user);
        console.log('pass token');
        yield delete user.password;
        return res.status(200).send({ auth: true, token: token, user: user, expiresIn: 86400 });
    }
    catch (err) {
        next(err);
    }
});
