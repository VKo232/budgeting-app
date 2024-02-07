import { SQLTransactionAsync } from 'expo-sqlite';
import { Moment } from 'moment';

export enum CategoryPeriod {
  YEARLY = 0,
  MONTHLY = 1,
  WEEKLY = 2,
}

export type BudgetCategoryType = {
  id: number;
  name: string;
  period: CategoryPeriod;
  goal: number; // goal is integer 100 represents $1
};

export type ExpenseType = {
  id: number;
  label: string;
  date: Moment;
};

export const defaultCategories = [
  { id: 1, name: 'Food', period: CategoryPeriod.MONTHLY },
  { id: 2, name: 'Transportation', period: CategoryPeriod.MONTHLY },
  { id: 3, name: 'Phone', period: CategoryPeriod.YEARLY },
  { id: 4, name: 'Utilities', period: CategoryPeriod.MONTHLY },
  { id: 5, name: 'Self Care', period: CategoryPeriod.MONTHLY },
];

export const removeCategory = async (tx: SQLTransactionAsync, id: number) => {
  if (id in defaultCategories.map((cat) => cat.id)) {
    console.warn('removing invalid category');
    return;
  }
  await tx.executeSqlAsync('DELETE FROM CATEGORIES', [id]);
};

/**
 * adds expense with date, id, period
 * @param tx SQLTransactionAsync
 * @param param1 id, name, Categoryperiod
 * id is optional or will be ignored if exists
 */
export const addCategory = async (
  tx: SQLTransactionAsync,
  {
    id,
    name,
    period,
  }: { id?: number | null; name: string; period: CategoryPeriod },
) => {
  if (id) {
    await tx.executeSqlAsync(
      'INSERT OR IGNORE into expenses(id,name,period, goal) values (?,?,?)',
      [id, name, period],
    );
  } else {
    await tx.executeSqlAsync('insert into expenses(name,period) values (?,?)', [
      name,
      period,
    ]);
  }
};

export const setupBudgeting = async (tx: SQLTransactionAsync) => {
  // create categories table
  await tx.executeSqlAsync(
    'create table if not exists CATEGORIES \
          (id integer primary key not null, \
            name TEXT, \
            period integer, \
            goal integer);',
  );
  // insert default categories
  defaultCategories.forEach((category) => {
    addCategory(tx, category);
  });
  // expenses table
  await tx.executeSqlAsync(
    'create table if not exists EXPENSES \
            (id INTEGER primary key not null, \
              categoryId INTEGER, \
              label TEXT,\
              amount INTEGER,\
              date DATETIME\
              FOREIGN KEY(categoryId) REFERENCES CATEGORIES(id));',
  );
};
