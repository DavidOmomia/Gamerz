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
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const NotAuthenticatedError_1 = __importDefault(require("../../tools/errors/NotAuthenticatedError"));
const handle = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let claims = null;
            const authorization = req.headers.authorization.split(' ');
            const authType = authorization[0];
            const authToken = authorization[1];
            if (req.headers.authorization && authType.toLowerCase() === 'bearer') {
                claims = yield authenticateBearerToken(authToken);
            }
            else {
                throw new NotAuthenticatedError_1.default('no authorization token found');
            }
            next();
        }
        catch (err) {
            // Catch and Propagate Token Error
            let _err = null;
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                _err = new NotAuthenticatedError_1.default('provided token has expired', err);
            }
            else if (err instanceof jsonwebtoken_1.NotBeforeError) {
                _err = new NotAuthenticatedError_1.default(`provided token cannot be used before ${err.date.toISOString()}`, err);
            }
            else {
                _err = new NotAuthenticatedError_1.default('provided token is invalid', err);
            }
            next(_err);
        }
    });
};
const authenticateBearerToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = fs_1.default.readFileSync('./oauth-public.key');
    return jsonwebtoken_1.default.verify(token, publicKey, (err, decoded) => {
        if (err) {
            return Promise.reject(err);
        }
        return decoded;
    });
});
exports.default = handle;
