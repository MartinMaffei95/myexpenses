import { Transaction } from '../interfaces/transaction.interface';

const updateBalance = (allTransactions: Transaction[], init?: number) => {
  let initial_balance = init || 0;
  let balance = 0;
  let total_incomes = 0;
  let total_expenses = 0;
  allTransactions.map((transaction) => {
    switch (transaction.type) {
      case 'SUBSTRACTION':
        total_expenses += transaction.value;
        balance -= transaction.value;
        break;
      case 'ADDITION':
        total_incomes += transaction.value;
        balance += transaction.value;
        break;
    }
  });
  return {
    actual_balance: balance + initial_balance,
    actual_incomes: total_incomes,
    actual_expenses: total_expenses,
  };
};

export { updateBalance };
