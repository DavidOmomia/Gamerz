"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainError_1 = __importDefault(require("./DomainError"));
class InternalServerError extends DomainError_1.default {
    constructor(message = 'you have just experience an internal server error', error = undefined, data = null, status = false) {
        super(message, error, data, status);
        this.error_name = 'server_error';
        this.httpCode = 500;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = InternalServerError;
