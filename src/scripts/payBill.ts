import { select } from '@inquirer/prompts';

import BillBO from '../business/billBO';
import AccountBO from '../business/accountBO';
import { expensePaymentMethods } from '../constants/paymentMethods';
import { PaymentMethods } from '../enums/paymentMethods';
import * as factoryBO from '../factories/factoryBO';
import * as dateHelper from '../helpers/date';
import { parseAccountsToChoices, parseBillsToChoices } from '../helpers/parser';
import { dateInput } from '../prompts/dateInput';
import Account from '../types/account';
import Bill from '../types/bill';


const payBill = async (): Promise<void> => {
  const billBO: BillBO = factoryBO.getBillBO();

  const openBills = await billBO.getAll({ status: ['open', 'closed']}, false);

  const {
    billId,
    date,
    accountId,
    paymentMethod
  } = await getDataByTerminal(openBills);

  await billBO.pay(
    billId,
    accountId,
    dateHelper.toDate(date, 'dd/MM/yyyy'),
    paymentMethod
  );
};

const getDataByTerminal = async (openBills: Bill[]) => {
  const accounts = await getAccounts();
  const methods = await getPaymentMethods(accounts);

  const billId = await select({
    message: 'Selecione a fatura que deseja pagar:',
    choices: parseBillsToChoices(openBills),
  });

  const date = await dateInput('Data do pagamento:');

  const paymentMethod = await select({
    message: 'Selecione a forma de pagamento:',
    choices: methods
  });

  const enabledAccounts = await filterAccounts(paymentMethod, accounts);
  const accountId = await select({
    message: 'Selecione a conta utilizada:',
    choices: parseAccountsToChoices(enabledAccounts)
  });

  return { billId, date, accountId, paymentMethod };
};

const getPaymentMethods = async (accounts: Account[]) => {
  const enabledMethods = new Set();

  accounts.forEach((account) => {
    const { enabled_payment_methods: enabledPaymentMethods } = account;

    enabledPaymentMethods.forEach((paymentMethod) =>
      enabledMethods.add(paymentMethod)
    );
  });

  return expensePaymentMethods.filter(
    (expensePaymentMethod) => enabledMethods.has(expensePaymentMethod.value)
  );
};

const getAccounts = async (): Promise<Account[]> => {
  const accountBO: AccountBO = factoryBO.getAccountBO();

  const accounts = await accountBO.getAll();

  return accounts;
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

export default payBill;