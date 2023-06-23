import Expense from '../types/expense';
import ExpenseModel from '../models/expense';


class ExpenseDAO {
  async create(expense: Expense) {
    try {
      const entityResponse = await ExpenseModel.create(
        expense
      );

      return entityResponse;
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }
}

export default ExpenseDAO;