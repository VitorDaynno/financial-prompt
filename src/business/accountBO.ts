import EnabledPaymentMethodsBO from './enabledPaymentMethodsBO';
import AccountDAO from '../daos/accountDAO';
import { PaymentMethods } from '../enums/paymentMethods';
import CreateEnabledPaymentMethod from '../types/createEnabledPaymentMethod';
import CreateAccount from '../types/createAccount';
import Account from '../types/account';


class AccountBO {
  private dao: AccountDAO;
  private enabledPaymentMethodsBO: EnabledPaymentMethodsBO;

  constructor(
    dao: AccountDAO,
    enabledPaymentMethodsBO: EnabledPaymentMethodsBO
  ) {
    this.dao = dao;
    this.enabledPaymentMethodsBO = enabledPaymentMethodsBO;
  }

  async create(payload: CreateAccount) {
    const { name, type, initialAmount, enabledPaymentMethods } = payload;

    const createdAccount = await this.dao.create({
      name,
      type,
      initial_amount: initialAmount,
    } as Account);

    const account = createdAccount.toJSON() as Account;

    await this.createEnabledPaymentMethods(account.id, enabledPaymentMethods);
  }
  
  async createEnabledPaymentMethods(
    accountId: number,
    enabledPaymentMethods: PaymentMethods[]
  ) {
    for(const paymentMethod of enabledPaymentMethods) {
      const entity: CreateEnabledPaymentMethod = {
        accountId,
        paymentMethod,
      };

      await this.enabledPaymentMethodsBO.create(entity);
    }
  }

  async getAll(): Promise<Account[]> {
    const rawAccounts = await this.dao.getAll();

    const accounts: Account[] = [];

    for(const account of rawAccounts) {
      const paymentMethods = await this.enabledPaymentMethodsBO.getByAccountId(
        account.id
      );

      account.enabled_payment_methods = paymentMethods.map(
        (paymentMethods) => paymentMethods.payment_method
      );

      accounts.push(account);
    }

    return accounts;
  }
}

export default AccountBO;