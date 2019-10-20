"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainError_1 = __importDefault(require("./DomainError"));
class RequestValidationError extends DomainError_1.default {
    constructor(message = "invalid data provided for the request", error = undefined, data = null) {
        super(message, error, data);
        this.error_name = "validation_error";
        this.httpCode = 422;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = RequestValidationError;
