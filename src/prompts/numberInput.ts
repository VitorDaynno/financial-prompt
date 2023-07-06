import { input } from '@inquirer/prompts';

import InputRules from '../types/inputRules';


export const numbertInput = async (message: string, rules: InputRules): Promise<string> => {
  const text = await input({
    message,
    validate: (value = '') => validate(value, rules),
    transformer: (value) => formatValue(value),
  });

  return formatValue(text);
};

const validate = (value: string, rules: InputRules) => {
  const { required } = rules;

  if (required) {
    if (!value.length) {
      return 'Campo obrigatório';
    }
  }

  if (isNaN(parseFloat(value))) {
    return 'Valor deve ser númerico';
  }

  return true;
};

const formatValue = (text: string) => {
  const quantityToComplete = text.length < 3 ? 3 - text.length : 0;

  return ('0'.repeat(quantityToComplete) + text)
    .replace(/[^0-9]*/g, '')
    .replace(/(\d)(\d{2}$)/g, '$1,$2')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};