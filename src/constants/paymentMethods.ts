import { PaymentMethods } from '../enums/paymentMethods';

export const expensePaymentMethods = [
  {
    name: 'Crédito',
    value: PaymentMethods.Credit
  },
  {
    name: 'Pix',
    value: PaymentMethods.Pix
  },
  {
    name: 'Débito',
    value: PaymentMethods.Debit
  },
  {
    name: 'Dinheiro',
    value: PaymentMethods.Cash
  },
  {
    name: 'Transferência',
    value: PaymentMethods.Transfer
  }
];

export const revenuePaymentMethods = [
  {
    name: 'Pix',
    value: PaymentMethods.Pix
  },
  {
    name: 'Dinheiro',
    value: PaymentMethods.Cash
  },
  {
    name: 'Transferência',
    value: PaymentMethods.Transfer
  }
];