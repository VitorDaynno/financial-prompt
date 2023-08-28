import Sequelize from 'sequelize';

import db from '../config/database';
import CreditCard from './creditCard';
import Bill from './bill';


const Expense = db.define('credit_expenses', {
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
    type: Sequelize.ENUM('credit'),
    allowNull: false,
    defaultValue: 'credit',
  },
  bill_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  credit_card_id: {
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

Expense.belongsTo(CreditCard, { foreignKey: 'credit_card_id' });
Expense.belongsTo(Bill, { foreignKey: 'bill_id' });

export default Expense;