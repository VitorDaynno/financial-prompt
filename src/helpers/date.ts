import { parse, isValid } from 'date-fns';

export const isValidDate = (text: string, formatString: string) => {
  const date = parse(text, formatString, new Date());

  return isValid(date);
};

export const toDate = (date: string, formatString: string) => {
  return parse(date, formatString, new Date());
};