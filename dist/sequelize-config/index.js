"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV;
const config = {
    development: {
        db: {
            username,
            password,
            database,
            host
        }
    },
    test: {},
    production: {}
};
exports.default = config;
