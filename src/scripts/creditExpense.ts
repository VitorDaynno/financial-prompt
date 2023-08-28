import { select } from '@inquirer/prompts';
import chalk from 'chalk';

import CreditExpenseBO from '../business/creditExpenseBO';
import CreditCardBO from '../business/creditCardBO';
import * as factoryBO from '../factories/factoryBO';
import NumberTypes from '../enums/numberTypes';
import * as dateHelper from '../helpers/date';
import * as numberHelper from '../helpers/number';
import { dateInput } from '../prompts/dateInput';
import { textInput } from '../prompts/textInput';
import { numbertInput } from '../prompts/numberInput';
import CreditCard from '../types/creditCard';


const creditExpense = async (): Promise<void> => {
  const creditExpenseBO: CreditExpenseBO = factoryBO.getCreditExpenseBO();

  const creditCards: CreditCard[] = await getCreditCards();

  if (!creditCards.length) {
    console.log(
      chalk.red(
        'Nenhuma cartão de crédito encontrado!'
      )
    );
    return;
  }

  const {
    description,
    value,
    date,
    creditCard,
    category,
    note,
  } = await getDataByTerminal(creditCards);

  await creditExpenseBO.create({
    description,
    amount: numberHelper.stringToNumber(value) * 100,
    date: dateHelper.toDate(date, 'dd/MM/yyyy'),
    creditCardId: creditCard,
    category,
    note
  });
};

const getCreditCards = async (): Promise<CreditCard[]> => {
  const creditCardBO: CreditCardBO = factoryBO.getCreditCardBO();

  const creditCards = await creditCardBO.getAll();

  return creditCards;
};

const getDataByTerminal = async (
  creditCards: CreditCard[]
) => {
  const description = await textInput(
    'Descrição da despesa:',
    { required: true, maxLength: 40 }
  );

  const value = await numbertInput(
    'Valor da despesa: R$',
    { required: true },
    NumberTypes.Float
  );

  const date = await dateInput('Data da despesa:');

  const creditCard = await select({
    message: 'Selecione o cartão utilizado:',
    choices: parseToChoices(creditCards)
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
    creditCard,
    category,
    note,
  };
};

const parseToChoices = (creditCards: CreditCard[]) => {
  const choices = creditCards.map((account: CreditCard)=> {
    const { id, name } = account;

    return {
      name,
      value: id,
    };
  });

  return choices;
};

export default creditExpense;