"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainError extends Error {
    constructor(message, error = undefined, data = [], status = false) {
        //the message variable is from the Error Class
        super(message);
        this.error_code = '00000';
        this.error_name = 'domain_error';
        this.httpCode = 500;
        this.internal = error;
        this.data = data;
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    getCode() {
        return this.error_code;
    }
    getInternalError() {
        return this.internal;
    }
    getHttpCode() {
        return this.httpCode;
    }
    getData() {
        return this.data;
    }
    getName() {
        return this.error_name;
    }
}
exports.default = DomainError;
