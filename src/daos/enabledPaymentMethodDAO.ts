import EnabledPaymentMethods from '../types/enabledPaymentMethods';
import EnabledPaymentMethodsModel from '../models/enabledPaymentMethods';


class EnabledPaymentMethodsDAO {
  async create(enabledPaymentMethods: EnabledPaymentMethods) {
    try {
      const entityResponse = await EnabledPaymentMethodsModel.create(
        enabledPaymentMethods
      );

      return entityResponse;
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async getByAccountId(accountId: number): Promise<EnabledPaymentMethods[]> {
    try {
      const enabledPaymentMethods = await EnabledPaymentMethodsModel.findAll({
        where: {
          account_id: accountId
        }
      });

      return enabledPaymentMethods.map(
        (enabledPaymentMethod) => enabledPaymentMethod.toJSON()
      );
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }
}

export default EnabledPaymentMethodsDAO;