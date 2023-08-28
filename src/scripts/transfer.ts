import chalk from 'chalk';
import { select } from '@inquirer/prompts';

import AccountBO from '../business/accountBO';
import ExpenseBO from '../business/expenseBO';
import RevenueBO from '../business/revenueBO';
import NumberTypes from '../enums/numberTypes';
import { PaymentMethods } from '../enums/paymentMethods';
import * as factoryBO from '../factories/factoryBO';
import * as dateHelper from '../helpers/date';
import * as numberHelper from '../helpers/number';
import { dateInput } from '../prompts/dateInput';
import { numbertInput } from '../prompts/numberInput';
import { textInput } from '../prompts/textInput';
import Account from '../types/account';


const transfer = async (): Promise<void> => {
  const accounts: Account[] = await getAccounts();

  if (!accounts.length) {
    console.log(
      chalk.red(
        'Nenhuma conta encontrada!'
      )
    );
    return;
  }

  const {
    value,
    date,
    originAccount,
    destinyAccount,
    note,
  } = await getDataByTerminal(accounts);

  await createTransfer(value, date, originAccount, destinyAccount, note);
};

const getAccounts = async (): Promise<Account[]> => {
  const accountBO: AccountBO = factoryBO.getAccountBO();

  const accounts = await accountBO.getAll();

  return accounts;
};

const getDataByTerminal = async (accounts: Account[]) => {
  const enabledAccounts = await filterAccounts(accounts);
  const accountChoices = parseToChoices(enabledAccounts);

  const value = await numbertInput(
    'Valor da transferência: R$',
    { required: true },
    NumberTypes.Float
  );

  const date = await dateInput('Data da receita:');

  const originAccount = await select({
    message: 'Selecione a conta de origem:',
    choices: accountChoices
  });

  const destinyAccount = await select({
    message: 'Selecione a conta de destino:',
    choices: accountChoices
  });

  const note = await textInput(
    'Observação:',
    { required: false, maxLength: 100 }
  );

  return {
    value,
    date,
    originAccount,
    destinyAccount,
    note,
  };
};

const filterAccounts = async (accounts: Account[]): Promise<Account[]> => {
  const enabledAccounts = accounts.filter(({ enabled_payment_methods }) => 
    enabled_payment_methods.includes(PaymentMethods.Transfer)
  );

  return enabledAccounts;
};

const parseToChoices = (accounts: Account[]) => {
  const choices = accounts.map((account: Account)=> {
    const { id, name } = account;

    return {
      name,
      value: id,
    };
  });

  return choices;
};

const createTransfer = async (
  value: string,
  date: string,
  originAccount: number,
  destinyAccount: number,
  note: string
) => {
  const expenseBO: ExpenseBO = factoryBO.getExpenseBO();
  const revenueBO: RevenueBO = factoryBO.getRevenueBO();

  await expenseBO.create({
    description: 'Transferência de saída',
    amount: numberHelper.stringToNumber(value) * 100,
    date: dateHelper.toDate(date, 'dd/MM/yyyy'),
    paymentMethod: PaymentMethods.Transfer,
    accountId: originAccount,
    category: 'Transferência',
    note
  });

  await revenueBO.create({
    description: 'Transferência de entrada',
    amount: numberHelper.stringToNumber(value) * 100,
    date: dateHelper.toDate(date, 'dd/MM/yyyy'),
    paymentMethod: PaymentMethods.Transfer,
    accountId: destinyAccount,
    category: 'Transferência',
    note
  });
};

export default transfer;