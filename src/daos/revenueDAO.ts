import RevenueModel from '../models/revenue';
import Revenue from '../types/revenue';


class RevenueDAO {
  async create(revenue: Revenue) {
    try {
      const entityResponse = await RevenueModel.create(
        revenue
      );

      return entityResponse;
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }
}

export default RevenueDAO;