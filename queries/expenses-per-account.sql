SELECT
  accounts.name,
  SUM(amount)/100 AS totalAmount
FROM vw_transactions
INNER JOIN accounts
  ON accounts.id = vw_transactions.account_id
WHERE
  vw_transactions.type <> 'revenue'
  AND {{date}}
  AND {{account}}
GROUP BY accounts.name
ORDER BY totalAmount DESC