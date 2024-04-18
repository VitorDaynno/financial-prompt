'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'credit_cards',
      'default_account_id',
      {
        type: Sequelize.INTEGER,
      }
    );

    await queryInterface.sequelize.query('UPDATE credit_cards SET default_account_id = 1');

    await queryInterface.changeColumn(
      'credit_cards',
      'default_account_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );

    await queryInterface.addConstraint(
      'credit_cards',
      {
        fields: ['default_account_id'],
        type: 'foreign key',
        references: {
          table: 'accounts',
          field: 'id'
        }
      }
    )
  },
};