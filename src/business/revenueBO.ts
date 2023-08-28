import RevenueDAO from '../daos/revenueDAO';
import Expense from '../types/expense';
import CreateExpense from '../types/createExpense';


class RevenueBO {
  private dao;

  constructor(dao: RevenueDAO) {
    this.dao = dao;
  }

  async create(expense: CreateExpense) {
    const {
      description,
      amount,
      date,
      paymentMethod,
      accountId,
      category,
      note
    } = expense;

    await this.dao.create({
      description,
      amount,
      date,
      payment_method: paymentMethod,
      account_id: accountId,
      category,
      note
    } as Expense);
  }
}

export default RevenueBO;