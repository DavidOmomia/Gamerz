'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
        required: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true,
        required: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true,
        required: true,
        unique: true,
        isAlphaNumeric:true,
        len: [8, 20]
    },
    avatar: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        required: true,
        unique: true,
        isEmail: true,
        len: [7, 100]
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [5, 20]
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};