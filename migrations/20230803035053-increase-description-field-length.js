'use strict';

/** @type {import('sequelize-cli').Migration} */
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
