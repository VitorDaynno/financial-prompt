'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'expenses',
      'description',
      {
        type: Sequelize.STRING(40),
        allowNull: false,
      }
    );
  },
};
