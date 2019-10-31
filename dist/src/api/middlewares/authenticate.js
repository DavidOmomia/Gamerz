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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const NotAuthenticatedError_1 = __importDefault(require("../../core/errors/NotAuthenticatedError"));
const models_1 = __importDefault(require("../../core/models"));
const secret = process.env.SECRET;
const handle = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let claims;
            const authorization = req.headers.authorization.split(' ');
            const authType = authorization[0];
            const authToken = authorization[1];
            if (req.headers.authorization && authType.toLowerCase() === 'bearer') {
                claims = yield authenticateBearerToken(authToken);
            }
            else {
                throw new NotAuthenticatedError_1.default('no authorization token found');
            }
            /**
             * Use the aud claim to get the client form DB. Check client status and availabilty too
             */
            const client = yield models_1.default.User.findOne({
                where: {
                    id: claims.id
                }
            });
            res.locals.claims = claims;
            res.locals.client = client;
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
    return jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log('auth error', err);
            return Promise.reject(err);
        }
        console.log(decoded);
        return decoded;
    });
});
exports.default = handle;
