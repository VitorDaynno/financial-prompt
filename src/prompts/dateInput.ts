import { input } from '@inquirer/prompts';

import { isValidDate } from '../helpers/date';


export const dateInput = async (message: string): Promise<string> => {
  const text = await input({
    message,
    validate: (value = '') => isValidDate(value, 'dd/MM/yyyy')
      || 'Insira uma data válida',
  });

  return text;
};