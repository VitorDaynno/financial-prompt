const viewName = 'vw_transactions';
const query = `
  SELECT
      *,
      CONVERT('revenue' USING utf8mb4) AS type
  FROM revenues
  UNION
  SELECT
    *,
      CONVERT('expense' USING utf8mb4) AS type
  FROM expenses
  UNION
  SELECT
    bills.id,
    CONCAT('Fatura ', credit_cards.name),
      amount,
      due_date,
      '-',
      credit_cards.default_account_id,
      'Fatura',
      '',
      bills.createdAt,
      bills.updatedAt,
      false,
      CONVERT('bill' USING utf8mb4) AS type
  FROM
    bills
  INNER JOIN credit_cards
    ON credit_cards.id = bills.credit_card_id
  WHERE
    status <> 'paid'
`;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
  }
};