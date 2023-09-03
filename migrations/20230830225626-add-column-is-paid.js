'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'expenses',
      'is_paid',
      {
        type: Sequelize.BOOLEAN,
      }
    );
    await queryInterface.addColumn(
      'revenues',
      'is_paid',
      {
        type: Sequelize.BOOLEAN,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'expenses',
      'is_paid'
    );
    await queryInterface.removeColumn(
      'revenues',
      'is_paid'
    );
  }
};
