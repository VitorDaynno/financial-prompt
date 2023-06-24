import Sequelize from 'sequelize';

import db from '../config/database';
import Account from './account';


const EnabledPaymentMethods = db.define('enabled_payment_methods', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  payment_method: {
    type: Sequelize.ENUM('cash', 'debit', 'pix', 'transfer'),
    allowNull: false
  },
});

EnabledPaymentMethods.belongsTo(Account, { foreignKey: 'account_id' });

export default EnabledPaymentMethods;