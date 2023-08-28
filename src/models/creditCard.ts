import Sequelize from 'sequelize';

import db from '../config/database';


const CreditCard = db.define('credit_cards', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  closingDate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dueDate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});


export default CreditCard;