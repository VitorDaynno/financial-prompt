import CreditExpenseModel from '../models/creditExpense';
import CreditExpense from '../types/creditExpense';


class CreditExpenseDAO {
  async create(expense: CreditExpense) {
    try {
      const entityResponse = await CreditExpenseModel.create(
        expense
      );

      return entityResponse;
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }
}

export default CreditExpenseDAO;