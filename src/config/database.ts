import { Sequelize } from 'sequelize';

import { database } from './settings';


const { host, user, password, database: databaseName } = database;

const sequelize = new Sequelize(databaseName, user, password, {
  host,
  dialect: 'mysql',
  logging: false
});


export default sequelize;