"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainError_1 = __importDefault(require("./DomainError"));
class NotAuthorizedError extends DomainError_1.default {
    constructor(message = 'request is not authorized', error = undefined, data = null, status = false) {
        super(message, error, data, status);
        this.error_name = 'not_authorized';
        this.httpCode = 403;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = NotAuthorizedError;
