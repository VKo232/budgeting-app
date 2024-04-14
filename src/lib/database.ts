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
  await setupMainCategory(tx);
  await setupCategories(tx);
  await setupExpenses(tx);
};

const setupDatabaseAsync = async () => {
  // try {
  //   await database.transactionAsync(async (tx: SQLTransactionAsync) => {
  //     await tx.executeSqlAsync('drop table CATEGORIES;');
  //     await tx.executeSqlAsync('drop table MAIN_CATEGORY;');
  //   });
  // } catch (e) {}

  await database.transactionAsync(async (tx: SQLTransactionAsync) => {
    await setupBudgeting(tx);
  });
  // await database.transactionAsync(async (tx: SQLTransactionAsync) => {
  //   console.log(await tx.executeSqlAsync(`select * from categories`));
  // });
};

const db = {
  setupDatabaseAsync,
  database,
};
export default db;
