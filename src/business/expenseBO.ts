import ExpenseDAO from '../daos/expenseDAO';
import Expense from '../types/expense';
import CreateExpense from '../types/createExpense';


class ExpenseBO {
  private dao;

  constructor(dao: ExpenseDAO ) {
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
      isPaid,
      note
    } = expense;

    await this.dao.create({
      description,
      amount,
      date,
      payment_method: paymentMethod,
      account_id: accountId,
      category,
      is_paid: isPaid,
      note
    } as Expense);
  }
}

export default ExpenseBO;