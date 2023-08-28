'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'accounts',
      'type',
      {
        type: Sequelize.ENUM('current', 'saving', 'physical'),
        allowNull: false
      }
    );
  }
};
