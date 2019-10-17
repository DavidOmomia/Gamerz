import Sequelize from 'sequelize'
import db from '../utils/models/index'
import Product from './products'

const User = db.sequelize.define('User',{
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
        type:Sequelize.NUMBER
    }
}, {
    timestamps: false
})


//Relations
User.hasMany(Product,{as:'Products',foreignKey:'userId'})


export default User