import { select, checkbox } from '@inquirer/prompts';

import AccountBO from '../business/accountBO';
import { AccountTypes } from '../enums/accountTypes';
import { PaymentMethods } from '../enums/paymentMethods';
import * as factoryBO from '../factories/factoryBO';
import * as numberHelper from '../helpers/number';
import { textInput } from '../prompts/textInput';


const account = async (): Promise<void> => {
  const accountBO: AccountBO = factoryBO.getAccountBO();

  const {
    name,
    type,
    value,
    enabledPaymentMethods
  } = await getDataByTerminal();

  await accountBO.create({
    name,
    type,
    initialAmount: numberHelper.stringToNumber(value) * 100,
    enabledPaymentMethods,
  });
};

const getDataByTerminal = async () => {
  const name = await textInput('Nome da conta:', { required: true, maxLength: 20 });

  const type = await select({
    message: 'Selecione o tipo da conta:',
    choices: getAccountTypes(),
  });

  const value = await textInput('Valor inicial da conta: R$', { required: true, maxLength: 20 });

  const enabledPaymentMethods = await checkbox({
    message: 'Métodos habilitados:',
    choices: getEnabledPaymentMethods()
  });

  return { name, type, value, enabledPaymentMethods };
};

const getAccountTypes = () => {
  const accountTypes = [
    {
      name: 'Conta corrente',
      value: AccountTypes.Current
    },
    {
      name: 'Conta poupança',
      value: AccountTypes.Saving
    },
    {
      name: 'Física',
      value: AccountTypes.Physical
    }
  ];

  return accountTypes;
};

const getEnabledPaymentMethods = () => {
  const paymentMethods = [
    {
      name: 'Débito',
      value: PaymentMethods.Debit
    },
    {
      name: 'PIX',
      value: PaymentMethods.Pix
    },
    {
      name: 'Transferência',
      value: PaymentMethods.Transfer
    },
  ];

  return paymentMethods;
};

export default account;