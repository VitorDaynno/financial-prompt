import { PaymentMethods } from '../enums/paymentMethods';


type Expense = {
  id: number;
  description: string;
  amount: number;
  date: Date,
  payment_method: PaymentMethods,
  account_id: number,
  category: string,
  note?: string,
}

export default Expense;