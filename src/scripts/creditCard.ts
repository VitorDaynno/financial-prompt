import { numbertInput } from '../prompts/numberInput';
import { textInput } from '../prompts/textInput';
import * as factoryBO from '../factories/factoryBO';
import * as numberHelper from '../helpers/number';
import NumberTypes from '../enums/numberTypes';


const creditCard = async () => {
  const creditBO = factoryBO.getCreditCardBO();

  const { name, dueDate, closingDate } = await getDataByTerminal();

  await creditBO.create({
    name,
    dueDate: numberHelper.stringToNumber(dueDate),
    closingDate: numberHelper.stringToNumber(closingDate),
  });
};

const getDataByTerminal = async () => {
  const name = await textInput(
    'Nome do cartão de crédito:',
    { required: true, maxLength: 40 }
  );

  const closingDate = await numbertInput(
    'Dia do fechamento:',
    { required: true, maxLength: 2},
    NumberTypes.Integer
  );

  const dueDate = await numbertInput(
    'Dia do pagamento:',
    { required: true, maxLength: 2 },
    NumberTypes.Integer
  );

  return { name, dueDate, closingDate };
};


export default creditCard;