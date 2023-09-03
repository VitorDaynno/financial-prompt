'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'expenses',
      'is_paid',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    );
    await queryInterface.changeColumn(
      'revenues',
      'is_paid',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'expenses',
      'is_paid',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }
    );
    await queryInterface.changeColumn(
      'revenues',
      'is_paid',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }
    );
  }
};
