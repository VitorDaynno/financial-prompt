import AccountDAO from '../daos/accountDAO';
import ExpenseDAO from '../daos/expenseDAO';
import EnabledPaymentMethodsDAO from '../daos/enabledPaymentMethodDAO';


export const getDAO = (
  name: string
): AccountDAO | ExpenseDAO | EnabledPaymentMethodsDAO => {
  switch(name) {
  case 'account':
    return new AccountDAO();
  case 'expense':
    return new ExpenseDAO();
  case 'enabledPaymentMethod':
    return new EnabledPaymentMethodsDAO();
  default:
    throw 'DAO not found';
  }
};

export default getDAO;