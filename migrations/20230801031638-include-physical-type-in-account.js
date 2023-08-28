'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
