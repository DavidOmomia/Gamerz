"use strict";
// import mysql from 'mysql2'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'gamerz',
//     password:'123456789'
// })
// export default pool.promise()
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = new sequelize_1.default('gamerz', 'root', '123456789', { dialect: 'mysql', host: 'localhost', operatorsAliases: false });
exports.default = sequelize;
