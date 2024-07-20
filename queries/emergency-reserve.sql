SELECT
  COALESCE(((expenses/months_quantity)*6)/100, 0)
FROM (
  SELECT
    SUM(
      IF(vw_transactions.type='expense' OR vw_transactions.type='bill', amount, 0)
    ) AS expenses,
    (
      SELECT
        COUNT(*)
      FROM (
        SELECT
          SUM(1)
        FROM vw_transactions
        WHERE {{date}}
        GROUP BY date_format(vw_transactions.date, '%Y-%M')
        ORDER BY date_format(vw_transactions.date, '%Y-%M') DESC
      ) months
    ) AS months_quantity
  FROM vw_transactions
  INNER JOIN accounts
    ON accounts.id = vw_transactions.account_id
  WHERE
    {{date}}
    AND {{account}}
) items