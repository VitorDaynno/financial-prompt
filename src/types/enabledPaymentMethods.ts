import { PaymentMethods } from '../enums/paymentMethods';

type EnabledPaymentMethods = {
  id?: number;
  account_id: number;
  payment_method: PaymentMethods,
}

export default EnabledPaymentMethods;