import { SQLTransactionAsync, openDatabase } from 'expo-sqlite';
import { setupBudgeting } from './budgeting/budgeting';

const database = openDatabase('db.db');

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
