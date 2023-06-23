import Sequelize from 'sequelize';
import db from '../config/database';


const Account = db.define('accounts', {
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
  type: {
    type: Sequelize.ENUM('current', 'saving'),
    allowNull: false
  },
  initial_amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});


export default Account;