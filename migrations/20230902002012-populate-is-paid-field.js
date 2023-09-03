'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.sequelize.query('UPDATE expenses SET is_paid=true');
    queryInterface.sequelize.query('UPDATE revenues SET is_paid=true');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.sequelize.query('UPDATE expenses SET is_paid=null');
    queryInterface.sequelize.query('UPDATE revenues SET is_paid=null');
  }
};
