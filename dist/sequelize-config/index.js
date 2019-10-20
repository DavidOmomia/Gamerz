"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        // db: {
        username,
        password,
        database,
        host,
        port: '3306',
        'migrations-path': './src/core/databasas/migrations',
        // },
        dialect: 'mysql'
    },
    // dialect: 'mysql',
    test: { dialect: 'mysql' },
    production: { dialect: 'mysql' }
};
console.log(config[node_env]);
exports.default = config[node_env];
