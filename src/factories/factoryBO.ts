import AccountBO from '../business/accountBO';
import ExpenseBO from '../business/expenseBO';
import EnabledPaymentMethodsBO from '../business/enabledPaymentMethodsBO';
import EnabledPaymentMethodsDAO from '../daos/enabledPaymentMethodDAO';
import AccountDAO from '../daos/accountDAO';
import ExpenseDAO from '../daos/expenseDAO';
import getDAO from './factoryDAO';


export const getAccountBO = () => new AccountBO(
  getDAO('account') as AccountDAO,
  getEnabledPaymentMethodsBO(),
);

export const getExpenseBO = () => new ExpenseBO(
  getDAO('expense') as ExpenseDAO
);

export const getEnabledPaymentMethodsBO = () => new EnabledPaymentMethodsBO(
  getDAO('enabledPaymentMethod') as EnabledPaymentMethodsDAO
);
