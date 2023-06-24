import { input } from '@inquirer/prompts';

import InputRules from '../types/inputRules';


export const textInput = async (message: string, rules: InputRules): Promise<string> => {
  const text = await input({
    message,
    validate: (value = '') => validate(value, rules),
  });

  return text;
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

  return true;
};