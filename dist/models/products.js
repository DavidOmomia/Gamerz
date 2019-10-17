"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const index_1 = __importDefault(require("../utils/models/index"));
const user_1 = __importDefault(require("./user"));
const Product = index_1.default.sequelize.define('product', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: { type: sequelize_1.default.STRING, allowNull: false },
    price: {
        type: sequelize_1.default.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    userId: sequelize_1.default.INTEGER
}, {
    timestamps: false
});
//Relations
Product.belongsTo(user_1.default, { as: "Users", foreignKey: 'userId' });
exports.default = Product;
