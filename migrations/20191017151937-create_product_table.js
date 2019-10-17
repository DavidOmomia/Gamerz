'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING, allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId:Sequelize.INTEGER
    }, {
      timestamps: false
  })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products')
  }
};
