import Sequelize from 'sequelize';

import db from '../config/database';
import Account from './account';


const Expense = db.define('expenses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: Sequelize.STRING(20),
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
    type: Sequelize.ENUM('cash', 'debit', 'pix', 'transfer'),
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
  is_paid: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  note: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
});

Expense.belongsTo(Account, { foreignKey: 'account_id' });

export default Expense;