import { Operations } from './src/types';
import db from './src/config/database';
import expense from './src/scripts/expense';
import account from './src/scripts/account';


const operations: Operations = {
  expense: expense,
  account: account,
}

const init = async () => {
  const operation = process.argv[2];

  await db.sync();

  if(!operation) {
    console.log('É necessário informar uma ação!');
    return;
  }

  await operations[operation]();
}

init();