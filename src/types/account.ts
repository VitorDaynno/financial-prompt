import { AccountTypes } from '../enums/accountTypes';
import { PaymentMethods } from '../enums/paymentMethods';


type Account = {
  id: number;
  name: string;
  type: AccountTypes;
  initial_amount: number;
  enabled_payment_methods: PaymentMethods[]
}

export default Account;