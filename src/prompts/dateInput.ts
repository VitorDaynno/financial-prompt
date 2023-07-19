import { input } from '@inquirer/prompts';

import { isValidDate } from '../helpers/date';


export const dateInput = async (message: string): Promise<string> => {
  const text = await input({
    message,
    validate: (value = '') => isValidDate(formatValue(value), 'dd/MM/yyyy')
      || 'Insira uma data válida',
    transformer: (value) => formatValue(value),
  });

  return formatValue(text);
};

const formatValue = (text: string) => {
  const quantityToComplete = text.length < 8 ? 8 - text.length : 0;

  return ('0'.repeat(quantityToComplete) + text)
    .substring(text.length - 8)
    .replace(/(^\d{2})(\d{2})(\d{4}$)/g, '$1/$2/$3');
};