import RevenueDAO from '../daos/revenueDAO';
import Revenue from '../types/revenue';
import CreateRevenue from '../types/createRevenue';


class RevenueBO {
  private dao;

  constructor(dao: RevenueDAO) {
    this.dao = dao;
  }

  async create(expense: CreateRevenue) {
    const {
      description,
      amount,
      date,
      paymentMethod,
      accountId,
      category,
      isPaid,
      note
    } = expense;

    await this.dao.create({
      description,
      amount,
      date,
      payment_method: paymentMethod,
      account_id: accountId,
      category,
      is_paid: isPaid,
      note
    } as Revenue);
  }
}

export default RevenueBO;