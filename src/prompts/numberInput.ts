import { input } from '@inquirer/prompts';

import InputRules from '../types/inputRules';
import NumberTypes from '../enums/numberTypes';


export const numbertInput = async (
  message: string,
  rules: InputRules,
  type: NumberTypes
): Promise<string> => {
  const text = await input({
    message,
    validate: (value = '') => validate(value, rules),
    transformer: (value) => formatValue(value, type),
  });

  return formatValue(text, type);
};

const validate = (value: string, rules: InputRules) => {
  const { required, maxLength } = rules;

  if (required) {
    if (!value.length) {
      return 'Campo obrigatório';
    }
  }

  if (maxLength) {
    if (value.length > maxLength) {
      return `Campo deve possuir no máximo ${maxLength} caracteres`;
    }
  }

  if (isNaN(parseFloat(value))) {
    return 'Valor deve ser númerico';
  }

  return true;
};

const formatValue = (text: string, type: NumberTypes) => {
  const quantityToComplete = text.length < 3 ? 3 - text.length : 0;

  if (type === NumberTypes.Integer) {
    return text.replace(/[^0-9]*/g, '');
  }

  return ('0'.repeat(quantityToComplete) + text)
    .replace(/[^0-9]*/g, '')
    .replace(/(\d)(\d{2}$)/g, '$1,$2')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};