'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
            required: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            required: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            required: true,
            unique: true,
            isAlphaNumeric: true,
            len: [8, 20]
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            required: true,
            unique: true,
            isEmail: true,
            len: [7, 100]
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [8, 20]
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        underscored: true,
        paranoid: true
    });
    User.associate = function (models) {
        // associations can be defined here
        //User hasMany Products
        User.hasMany(models.Product, { foreignKey: 'userId' });
    };
    return User;
};
