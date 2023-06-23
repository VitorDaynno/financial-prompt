import EnabledPaymentMethodsDAO from '../daos/enabledPaymentMethodDAO';
import EnabledPaymentMethods from '../types/enabledPaymentMethods';
import CreateEnabledPaymentMethod from '../types/createEnabledPaymentMethod';


class EnabledPaymentMethodsBO {
  private dao: EnabledPaymentMethodsDAO;

  constructor(dao: EnabledPaymentMethodsDAO) {
    this.dao = dao;
  }

  async create(enabledPayment: CreateEnabledPaymentMethod) {
    const { accountId, paymentMethod } = enabledPayment;

    await this.dao.create({
      account_id: accountId,
      payment_method: paymentMethod
    });
  }

  async getByAccountId(accountId: number): Promise<EnabledPaymentMethods[]> {
    const enabledPaymentMethods: EnabledPaymentMethods[] = await this.dao
      .getByAccountId(accountId);

    return enabledPaymentMethods;
  }
}

export default EnabledPaymentMethodsBO;