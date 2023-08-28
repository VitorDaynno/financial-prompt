import { BillStatus } from '../enums/billStatus';

type UpdateBill = {
  amount?: number;
  status?: BillStatus;
}

export default UpdateBill;