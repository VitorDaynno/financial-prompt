export const stringToNumber = (value: string): number => {
  return parseFloat(value.replace('.', '').replace(',', '.'));
};