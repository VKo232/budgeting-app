import { SQLTransactionAsync, openDatabase } from 'expo-sqlite';
import { setupCategories } from './budgeting/category';
import { setupExpenses } from './budgeting/expense';
import { setupMainCategory } from './budgeting/mainCategory';

const database = openDatabase('db.db');
const setupBudgeting = async (tx: SQLTransactionAsync) => {
  // await tx.executeSqlAsync('drop table categories;');
  await setupMainCategory(tx);
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
