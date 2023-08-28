import CreditCardBO from './creditCardBO';
import ExpenseBO from './expenseBO';
import BillDAO from '../daos/billDAO';
import { PaymentMethods } from '../enums/paymentMethods';
import { BillStatus } from '../enums/billStatus';
import * as DateHelper from '../helpers/date';
import Bill from '../types/bill';
import CreateBill from '../types/createBill';


class BillBO {
  private dao: BillDAO;
  private creditCardBO: CreditCardBO;
  private expenseBO: ExpenseBO;
  private dateHelper: typeof DateHelper;

  constructor(
    dao: BillDAO,
    creditCardBO: CreditCardBO,
    expenseBO: ExpenseBO,
    dateHelper: typeof DateHelper
  ) {
    this.dao = dao;
    this.creditCardBO = creditCardBO;
    this.expenseBO = expenseBO;
    this.dateHelper = dateHelper;
  }

  async getCurrencyBillInDate(
    creditCardId: number,
    purchaseDate: Date
  ): Promise<Bill> {
    const creditCard = await this.creditCardBO.getById(creditCardId);

    if (!creditCard) {
      console.log('Cartão de crédito não encontrado!');
      throw 'Credit card not found';
    }

    const { closingDate, dueDate } = creditCard;

    const date = purchaseDate.getDate();
    const month = purchaseDate.getMonth() + 1;
    const year = purchaseDate.getFullYear();

    let closedBillDate = this.dateHelper.toDate(
      `${closingDate}/${month}/${year}`,
      'dd/MM/yyyy'
    );
    let dueBillDate = this.dateHelper.toDate(
      `${dueDate}/${month}/${year}`,
      'dd/MM/yyyy'
    );

    if (date >= closingDate) {
      closedBillDate = this.dateHelper.addMonthToDate(closedBillDate, 1);
      dueBillDate = this.dateHelper.addMonthToDate(dueBillDate, 1);
    }

    const bill = await this.dao.getCurrencyInDate(creditCardId, closedBillDate);

    if (!bill) {
      return await this.create({
        creditCardId,
        closingDate: closedBillDate,
        dueDate: dueBillDate
      });
    }

    return bill;
  }

  async create(payload: CreateBill): Promise<Bill> {
    const { dueDate, closingDate, creditCardId } = payload;

    const createdBill = await this.dao.create({
      amount: 0,
      credit_card_id: creditCardId,
      closing_date: closingDate,
      due_date: dueDate,
      status: BillStatus.Open,
    } as Bill);

    return createdBill;
  }

  async updateBillAmount(id: number, valueToIncrease: number): Promise<void> {
    const bill = await this.getById(id);

    this.dao.update(id, {
      amount: bill.amount + valueToIncrease
    });
  }

  async getById(id: number): Promise<Bill> {
    const bill = await this.dao.getById(id);

    if (!bill) {
      throw 'Bill not found';
    }

    return bill;
  }

  async getAll(filter: { status: string[] }, raw = true): Promise<Bill[]> {
    const bills = await this.dao.getAll(filter);

    if(!raw) {
      for(const bill of bills) {
        const creditCard = await this.creditCardBO.getById(bill.credit_card_id);
        bill.credit_card = creditCard;
      }
    }

    return bills;
  }

  async pay(
    id: number,
    accountId: number,
    date: Date,
    paymentMethod: PaymentMethods
  ): Promise<void> {
    const bill = await this.getById(id);
    const creditCard = await this.creditCardBO.getById(bill.credit_card_id);

    if (bill.status === BillStatus.Paid) {
      throw 'Bill already paid';
    }

    await this.dao.update(id, {
      status: BillStatus.Paid
    });

    await this.expenseBO.create({
      accountId,
      amount: bill.amount,
      category: 'Fatura',
      date,
      description: `Pagamento da fatura ${creditCard?.name}`,
      paymentMethod
    });
  }
}

export default BillBO;