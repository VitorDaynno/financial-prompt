import { AccountTypes } from '../enums/accountTypes';
import { PaymentMethods } from '../enums/paymentMethods';


type CreateAccount = {
  name: string;
  type: AccountTypes;
  initialAmount: number;
  enabledPaymentMethods: PaymentMethods[]
}

export default CreateAccount;