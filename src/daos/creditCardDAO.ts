import CreditCardModel from '../models/creditCard';
import CreditCard from '../types/creditCard';


class CreditCardDAO {
  async create(creditCard: CreditCard) {
    try {
      const entityResponse = await CreditCardModel.create(
        creditCard
      );

      return entityResponse;
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async getAll(): Promise<CreditCard[]> {
    try {
      const creditCards = await CreditCardModel.findAll();

      return creditCards.map((creditCard)=> creditCard.toJSON());
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }

  async getById(id: number): Promise<CreditCard|undefined> {
    try {
      const creditCard = await CreditCardModel.findByPk(id);

      return creditCard?.toJSON();
    } catch (error) {
      console.error(`An error occurred in DAO: ${error}`);
      throw error;
    }
  }
}

export default CreditCardDAO;