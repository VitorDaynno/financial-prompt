export const stringToNumber = (value: string): number => {
  return parseFloat(value.replace('.', '').replace(',', '.'));
};

export const toMoney = (value: number): string => {
  return value.toString().replace(/[^0-9]*/g, '')
    .replace(/(\d)(\d{2}$)/g, '$1,$2')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};