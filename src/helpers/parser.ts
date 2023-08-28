import * as dateHelper from '../helpers/date';
import * as numberHelper from '../helpers/number';
import Account from '../types/account';
import Bill from '../types/bill';


export const parseAccountsToChoices = (accounts: Account[]) => {
  const choices = accounts.map((account: Account)=> {
    const { id, name } = account;

    return {
      name,
      value: id,
    };
  });

  return choices;
};

export const parseBillsToChoices = (bills: Bill[]) => {
  const choices = bills.map((bill: Bill)=> {
    const { id, due_date, amount, credit_card } = bill;

    const formattedDueDate = dateHelper.formatDate(
      new Date(`${due_date} 00:00:00`),
      'dd/MM/yyyy'
    );

    return {
      name: `Fatura ${credit_card?.name} (${formattedDueDate}) - R$ ${
        numberHelper.toMoney(amount)
      }`,
      value: id,
    };
  });

  return choices;
};