import Sequelize from 'sequelize';

import db from '../config/database';
import Account from './account';


const Revenue = db.define('revenues', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  payment_method: {
    type: Sequelize.ENUM('cash', 'pix', 'transfer'),
    allowNull: false
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  note: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
});

Revenue.belongsTo(Account, { foreignKey: 'account_id' });

export default Revenue;