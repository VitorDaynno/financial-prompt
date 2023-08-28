import chalk from 'chalk';
import { select } from '@inquirer/prompts';

import AccountBO from '../business/accountBO';
import RevenueBO from '../business/revenueBO';
import { revenuePaymentMethods } from '../constants/paymentMethods';
import { PaymentMethods } from '../enums/paymentMethods';
import NumberTypes from '../enums/numberTypes';
import * as factoryBO from '../factories/factoryBO';
import * as dateHelper from '../helpers/date';
import * as numberHelper from '../helpers/number';
import { dateInput } from '../prompts/dateInput';
import { numbertInput } from '../prompts/numberInput';
import { textInput } from '../prompts/textInput';
import Account from '../types/account';


const revenue = async (): Promise<void> => {
  const revenueBO: RevenueBO = factoryBO.getRevenueBO();

  const accounts: Account[] = await getAccounts();
  const methods = await getPaymentMethods(accounts);

  if (!accounts.length) {
    console.log(
      chalk.red(
        'Nenhuma conta encontrada!'
      )
    );
    return;
  }

  const {
    description,
    value,
    date,
    paymentMethod,
    account,
    category,
    note,
  } = await getDataByTerminal(methods, accounts);

  await revenueBO.create({
    description,
    amount: numberHelper.stringToNumber(value) * 100,
    date: dateHelper.toDate(date, 'dd/MM/yyyy'),
    paymentMethod,
    accountId: account,
    category,
    note
  });
};

const getAccounts = async (): Promise<Account[]> => {
  const accountBO: AccountBO = factoryBO.getAccountBO();

  const accounts = await accountBO.getAll();

  return accounts;
};

const getPaymentMethods = async (accounts: Account[]) => {
  const enabledMethods = new Set();

  accounts.forEach((account) => {
    const { enabled_payment_methods: enabledPaymentMethods } = account;

    enabledPaymentMethods.forEach((paymentMethod) =>
      enabledMethods.add(paymentMethod)
    );
  });

  return revenuePaymentMethods.filter(
    (revenuePaymentMethod) => enabledMethods.has(revenuePaymentMethod.value)
  );
};

const getDataByTerminal = async (
  methods: { name: string, value: PaymentMethods }[],
  accounts: Account[]
) => {
  const description = await textInput(
    'Descrição da receita:',
    { required: true, maxLength: 20 }
  );

  const value = await numbertInput(
    'Valor da receita: R$',
    { required: true },
    NumberTypes.Float
  );

  const date = await dateInput('Data da receita:');

  const paymentMethod = await select({
    message: 'Selecione a forma de pagamento:',
    choices: methods
  });

  const enabledAccounts = await filterAccounts(paymentMethod, accounts);
  const account = await select({
    message: 'Selecione a conta de destino:',
    choices: parseToChoices(enabledAccounts)
  });

  const category = await textInput(
    'Categoria:',
    { required: true, maxLength: 20}
  );

  const note = await textInput(
    'Observação:',
    { required: false, maxLength: 100 }
  );

  return {
    description,
    value,
    date,
    paymentMethod,
    account,
    category,
    note,
  };
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

const filterAccounts = async (
  paymentMethod: PaymentMethods,
  accounts: Account[]
): Promise<Account[]> => {
  const enabledAccounts = accounts.filter(({ enabled_payment_methods }) =>
    enabled_payment_methods.includes(paymentMethod)
  );

  return enabledAccounts;
};

export default revenue;