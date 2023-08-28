type CreateCreditExpense = {
  description: string;
  amount: number;
  date: Date,
  creditCardId: number,
  category: string,
  note?: string,
}

export default CreateCreditExpense;