import AccountBO from '../business/accountBO';
import BillBO from '../business/billBO';
import CreditCardBO from '../business/creditCardBO';
import CreditExpenseBO from '../business/creditExpenseBO';
import ExpenseBO from '../business/expenseBO';
import EnabledPaymentMethodsBO from '../business/enabledPaymentMethodsBO';
import RevenueBO from '../business/revenueBO';
import AccountDAO from '../daos/accountDAO';
import BillDAO from '../daos/billDAO';
import CreditCardDAO from '../daos/creditCardDAO';
import CreditExpenseDAO from '../daos/creditExpenseDAO';
import ExpenseDAO from '../daos/expenseDAO';
import EnabledPaymentMethodsDAO from '../daos/enabledPaymentMethodDAO';
import RevenueDAO from '../daos/revenueDAO';
import getDAO from './factoryDAO';
import * as DateHelper from '../helpers/date';

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

export const getRevenueBO = () => new RevenueBO(
  getDAO('revenue') as RevenueDAO
);

export const getCreditCardBO = () => new CreditCardBO(
  getDAO('creditCard') as CreditCardDAO
);

export const getBillBO = () => new BillBO(
  getDAO('bill') as BillDAO,
  getCreditCardBO(),
  getExpenseBO(),
  DateHelper
);

export const getCreditExpenseBO = () => new CreditExpenseBO(
  getDAO('creditExpense') as CreditExpenseDAO,
  getBillBO()
);