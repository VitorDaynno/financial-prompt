import Sequelize from 'sequelize';

import db from '../config/database';
import CreditCard from './creditCard';


const Bill = db.define('bills', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  closing_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  due_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  payment_date: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  credit_card_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed', 'paid'),
    allowNull: false
  },
});

Bill.belongsTo(CreditCard, { foreignKey: 'credit_card_id' });

export default Bill;