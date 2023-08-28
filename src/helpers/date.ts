import { parse, isValid, addMonths, format } from 'date-fns';

export const isValidDate = (text: string, formatString: string) => {
  const date = parse(text, formatString, new Date());

  return isValid(date);
};

export const toDate = (date: string, formatString: string) => {
  return parse(date, formatString, new Date());
};

export const addMonthToDate = (date: Date, quantity: number) => {
  return addMonths(date, quantity);
};

export const formatDate = (date: Date, formatString: string) => {
  return format(date, formatString);
};