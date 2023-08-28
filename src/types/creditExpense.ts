import { PaymentMethods } from '../enums/paymentMethods';


type CreditExpense = {
  id: number;
  description: string;
  amount: number;
  date: Date,
  payment_method: PaymentMethods,
  credit_card_id: number,
  bill_id: number,
  category: string,
  note?: string,
}

export default CreditExpense;