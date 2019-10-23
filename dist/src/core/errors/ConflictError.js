"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainError_1 = __importDefault(require("./DomainError"));
class ConflictError extends DomainError_1.default {
    constructor(message = 'The request could not be completed due to a conflict with the current state of the target resource', error = undefined, data = null) {
        super(message, error, data);
        this.error_name = 'conflict';
        this.httpCode = 409;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ConflictError;
