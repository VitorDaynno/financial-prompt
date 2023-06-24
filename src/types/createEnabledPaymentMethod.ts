import { PaymentMethods } from '../enums/paymentMethods';


type CreateEnabledPaymentMethod = {
  accountId: number;
  paymentMethod: PaymentMethods
}

export default CreateEnabledPaymentMethod;