import { PaymentMethods } from '../enums/paymentMethods';


type CreateExpense = {
  description: string;
  amount: number;
  date: Date,
  paymentMethod: PaymentMethods,
  accountId: number,
  category: string,
  isPaid: boolean,
  note?: string,
}

export default CreateExpense;