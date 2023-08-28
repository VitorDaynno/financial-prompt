import Bill from '../types/bill';
import BillModel from '../models/bill';
import UpdateBill from '../types/updateBill';


class BillDAO {
  async getCurrencyInDate(
    creditCardId: number,
    date: Date
  ): Promise<Bill | null> {
    try {
      const bill = await BillModel.findOne({
        where: {
          credit_card_id: creditCardId,
          closing_date: date
        }
      });

      return bill ? bill.toJSON(): null;
    } catch(error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async create(bill: Bill): Promise<Bill> {
    try {
      const entityResponse = await BillModel.create(
        bill
      );

      return entityResponse.toJSON();
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async update(id: number, fieldsToUpdate: UpdateBill): Promise<void> {
    try {
      const { amount, status } = fieldsToUpdate;

      await BillModel.update(
        {
          amount,
          status
        },
        {
          where: { id }
        }
      );

    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async getById(id: number): Promise<Bill|undefined> {
    try {
      const bill = await BillModel.findByPk(id);

      return bill?.toJSON();
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async getAll(filter: { status: string[] }): Promise<Bill[]> {
    try {
      const bills = await BillModel.findAll({
        where: {
          status: filter.status
        }
      });

      return bills.map((bill) => bill.toJSON());
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }
}

export default BillDAO;