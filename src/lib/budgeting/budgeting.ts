import { SQLTransactionAsync } from 'expo-sqlite';
import { setupExpenses } from './expense';
import { setupCategories } from './spendCategory';

export const setupBudgeting = async (tx: SQLTransactionAsync) => {
  await setupCategories(tx);
  await setupExpenses(tx);
};
