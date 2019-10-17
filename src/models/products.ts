

import Sequelize from 'sequelize'
import db from '../utils/models/index'
import User from './user'

const Product = db.sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{type:Sequelize.STRING,allowNull:false},
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
      userId:Sequelize.INTEGER
}, {
    timestamps: false
})


//Relations
Product.belongsTo(User,{as:"Users",foreignKey:'userId'})

export default Product
