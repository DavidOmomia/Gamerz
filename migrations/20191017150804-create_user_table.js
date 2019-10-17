'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('users',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
  },
  username:{
      type:Sequelize.STRING(255),
      allowNull:false,
      primaryKey:true,
      unique:true
  },
  password:{
      type:Sequelize.STRING(255),
      allowNull:false
  },
  email:{
      type:Sequelize.STRING(255),
      allowNull:false
  },
  avatar:{
      type:Sequelize.STRING
  },
  cash:{
      type:Sequelize.INTEGER
  }
   }, {
    timestamps: false
})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('users')
  }
};
