import Account from '../types/account';
import AccountModel from '../models/account';


class AccountDAO {
  async create(account: Account) {
    try {
      const entityResponse = await AccountModel.create(
        account
      );

      return entityResponse;
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async getAll(): Promise<Account[]> {
    try {
      const accounts = await AccountModel.findAll();

      return accounts.map((account)=> account.toJSON());
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }
}

export default AccountDAO;