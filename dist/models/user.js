"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const index_1 = __importDefault(require("../utils/models/index"));
const products_1 = __importDefault(require("./products"));
const User = index_1.default.sequelize.define('User', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    password: {
        type: sequelize_1.default.STRING(255),
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING(255),
        allowNull: false
    },
    avatar: {
        type: sequelize_1.default.STRING
    },
    cash: {
        type: sequelize_1.default.NUMBER
    }
}, {
    timestamps: false
});
//Relations
User.hasMany(products_1.default, { as: 'Products', foreignKey: 'userId' });
exports.default = User;
