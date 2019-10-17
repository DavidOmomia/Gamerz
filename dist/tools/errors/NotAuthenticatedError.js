"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainError_1 = __importDefault(require("./DomainError"));
class NotAuthenticatedError extends DomainError_1.default {
    constructor(message = 'this request is not authenticated', error = undefined, data = null, status = false) {
        super(message, error, data, status);
        this.error_name = 'not_authenticated';
        this.httpCode = 401;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = NotAuthenticatedError;
