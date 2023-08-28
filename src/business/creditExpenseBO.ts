import CreditExpenseDAO from '../daos/creditExpenseDAO';
import CreditExpense from '../types/creditExpense';
import CreateCreditExpense from '../types/createCreditExpense';
import { PaymentMethods } from '../enums/paymentMethods';
import BillBO from './billBO';
import { BillStatus } from '../enums/billStatus';


class CreditExpenseBO {
  private dao;
  private billBO;

  constructor(dao: CreditExpenseDAO, billBO: BillBO) {
    this.dao = dao;
    this.billBO = billBO;
  }

  async create(expense: CreateCreditExpense) {
    const {
      description,
      amount,
      date,
      creditCardId,
      category,
      note
    } = expense;

    const bill = await this.billBO.getCurrencyBillInDate(creditCardId, date);

    if (bill.status === BillStatus.Paid) {
      console.log('A fatura referente a essa despesa já encontra-se paga');
      throw 'Bill already paid';
    }

    await this.dao.create({
      description,
      amount,
      date,
      payment_method: PaymentMethods.Credit,
      credit_card_id: creditCardId,
      bill_id: bill.id,
      category,
      note
    } as CreditExpense);

    await this.billBO.updateBillAmount(bill.id, amount);
  }
}

export default CreditExpenseBO;