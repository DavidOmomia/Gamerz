"use strict";
// import db from '../utils/database'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default class Product {
//     id: any
//     title: string
//     imageUrl: string
//     description: string
//     price: number
//     constructor(id: any, title: string, imageUrl: string, description: string, price: number) {
//         this.id = id
//         this.title = title
//         this.imageUrl = imageUrl
//         this.description = description
//         this.price = price
//     }
//     save() {
//         console.log(this.title,this.price,this.description,this.imageUrl)
//         return db.execute('INSERT INTO products (title,price,imageUrl,description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]
//         )
//     }
//     static deleteById(id) {
//     }
//     static fetchAll() {
//         return db.execute('SELECT * FROM products')
//     }
//     //? protectd against sql injection
//     static findById(id:number) {
//        return  db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
//     }
// }
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../utils//database"));
const Product = database_1.default.define('item', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: sequelize_1.default.STRING,
    price: {
        type: sequelize_1.default.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.default = Product;
