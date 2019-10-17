// import mysql from 'mysql2'

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'gamerz',
//     password:'123456789'
// })

// export default pool.promise()


import Sequelize from 'sequelize'

const sequelize = new Sequelize('gamerz','root','123456789',{dialect:'mysql',host:'localhost',operatorsAliases:false})

export default sequelize