import AccountDAO from '../daos/accountDAO';
import BillDAO from '../daos/billDAO';
import CreditCardDAO from '../daos/creditCardDAO';
import CreditExpenseDAO from '../daos/creditExpenseDAO';
import ExpenseDAO from '../daos/expenseDAO';
import EnabledPaymentMethodsDAO from '../daos/enabledPaymentMethodDAO';
import RevenueDAO from '../daos/revenueDAO';


export const getDAO = (
  name: string
): AccountDAO | ExpenseDAO | EnabledPaymentMethodsDAO | CreditCardDAO | CreditExpenseDAO | BillDAO => {
  switch(name) {
  case 'account':
    return new AccountDAO();
  case 'expense':
    return new ExpenseDAO();
  case 'enabledPaymentMethod':
    return new EnabledPaymentMethodsDAO();
  case 'revenue':
    return new RevenueDAO();
  case 'creditCard':
    return new CreditCardDAO();
  case 'creditExpense':
    return new CreditExpenseDAO();
  case 'bill':
    return new BillDAO();
  default:
    throw 'DAO not found';
  }
};

export default getDAO;