SELECT
  COALESCE((revenues - expenses - bills)/100.0, 0) AS balance
FROM (
  SELECT
    SUM(
      IF(vw_transactions.type= 'revenue', amount, 0)
    ) AS revenues,
    SUM(
      IF(vw_transactions.type= 'expense', amount, 0)
    ) AS expenses,
    SUM(
      IF(vw_transactions.type= 'bill', amount, 0)
    ) AS bills
  FROM vw_transactions
  INNER JOIN accounts
    ON accounts.id = vw_transactions.account_id
  WHERE
    {{date}}
    AND {{account}}
) consolidate
