'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import config from '../sequelize-config/index'
const con=config[env]
const db:any = {};

console.log(config)
console.log(con)

const  sequelize = new Sequelize(con.db.database, con.db.username, con.db.password,{
  dialect:'mysql',
  host:con.db.host
})

fs
  .readdirSync(__dirname)
  .filter((file:any) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'|| file.slice(-3) === '.ts');
  })
  .forEach((file:any) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });


export default db;
