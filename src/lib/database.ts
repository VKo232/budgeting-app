import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { SQLTransactionAsync, openDatabase } from 'expo-sqlite';
import { setupCategories } from './budgeting/category';
import { setupExpenses } from './budgeting/expense';
import { setupMainCategory } from './budgeting/mainCategory';

async function openDatabase1() {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite'))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite',
    );
  }
  Asset.fromModule;
  // const file = require('SQLite/db.db');
  // await FileSystem.downloadAsync(
  //   Asset.fromModule(file).uri,
  //   FileSystem.documentDirectory + 'SQLite/db.db',
  // );
  return SQLite.openDatabase('db.db');
}
openDatabase1;

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
