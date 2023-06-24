import { PaymentMethods } from '../enums/paymentMethods';


type CreateExpense = {
  description: string;
  amount: number;
  date: Date,
  paymentMethod: PaymentMethods,
  accountId: number,
  category: string,
  note?: string,
}

export default CreateExpense;