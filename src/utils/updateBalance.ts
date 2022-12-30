import { Transaction } from '../interfaces/transaction.interface';

const updateBalance = (allTransactions: Transaction[]) => {
  let balance = 0;
  allTransactions.map((transaction) => {
    switch (transaction.type) {
      case 'SUBSTRACTION':
        balance -= transaction.value;
        break;
      case 'ADDITION':
        balance += transaction.value;
        break;
    }
  });
  console.log(balance);
  return balance;
};

export { updateBalance };
