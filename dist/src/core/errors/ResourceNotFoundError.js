"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainError_1 = __importDefault(require("./DomainError"));
class ResourceNotFoundError extends DomainError_1.default {
    constructor(message = 'resource not found', error = undefined, data = null) {
        super(message, error, data);
        this.error_name = 'not_found';
        this.httpCode = 404;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ResourceNotFoundError;
