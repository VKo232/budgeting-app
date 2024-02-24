import { SQLTransactionAsync, openDatabase } from 'expo-sqlite';
import { setupExpenses } from './budgeting/expense';
import { setupCategories } from './budgeting/spendCategory';

const database = openDatabase('db.db');
const setupBudgeting = async (tx: SQLTransactionAsync) => {
  await setupCategories(tx);
  await setupExpenses(tx);
};

const setupDatabaseAsync = async () => {
  return database.transactionAsync(async (tx: SQLTransactionAsync) => {
    await setupBudgeting(tx);
  });
};

const db = {
  setupDatabaseAsync,
  database,
};
export default db;
