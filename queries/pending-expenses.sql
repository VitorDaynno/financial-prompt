SELECT
  description,
  amount/100 as amount,
  date,
  payment_method,
  accounts.name,
  category,
  note
FROM vw_transactions
INNER JOIN accounts
  ON accounts.id = vw_transactions.account_id
WHERE
  vw_transactions.type <> 'revenue'
  and is_paid = false
  AND {{date}}
  AND {{account}}
