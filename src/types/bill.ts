import CreditCard from './creditCard';
import { BillStatus } from '../enums/billStatus';


type Bill = {
  id: number;
  amount: number;
  closing_date: Date;
  due_date: Date;
  credit_card_id: number;
  status: BillStatus;
  credit_card?: CreditCard;
}

export default Bill;