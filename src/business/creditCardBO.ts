import CreditCardDAO from '../daos/creditCardDAO';
import CreditCard from '../types/creditCard';
import CreateCreditCard from '../types/createCreditCard';


class CreditCardBO {
  private dao;

  constructor(dao: CreditCardDAO) {
    this.dao = dao;
  }

  async create(creditCard: CreateCreditCard) {
    const {
      name,
      dueDate,
      closingDate
    } = creditCard;

    await this.dao.create({
      name,
      dueDate,
      closingDate
    } as CreditCard);
  }

  async getAll(): Promise<CreditCard[]> {
    const creditCards = await this.dao.getAll();

    return creditCards;
  }

  async getById(id: number): Promise<CreditCard|undefined> {
    const creditCard = await this.dao.getById(id);

    return creditCard;
  }
}

export default CreditCardBO;