'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            required: true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            required: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER
        }
    }, {});
    Product.associate = function (models) {
        // associations can be defined here
        //product belongs to a user
        Product.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Product;
};
