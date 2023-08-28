import db from './src/config/database';
import account from './src/scripts/account';
import creditCard from './src/scripts/creditCard';
import creditExpense from './src/scripts/creditExpense';
import expense from './src/scripts/expense';
import payBill from './src/scripts/payBill';
import revenue from './src/scripts/revenue';
import transfer from './src/scripts/transfer';
import Operations from './src/types/operations';


const operations: Operations = {
  expense: expense,
  account: account,
  revenue: revenue,
  transfer: transfer,
  creditCard: creditCard,
  creditExpense: creditExpense,
  payBill: payBill,
};

const init = async () => {
  const operation = process.argv[2];

  await db.sync();

  if(!operation) {
    console.log('É necessário informar uma ação!');
    return;
  }

  await operations[operation]();
};

init();