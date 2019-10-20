'use strict';
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        email: DataTypes.STRING
    }, {});
    Client.associate = function (models) {
        // associations can be defined here
    };
    return Client;
};
