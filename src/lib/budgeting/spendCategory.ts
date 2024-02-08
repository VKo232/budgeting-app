import { SQLTransactionAsync } from 'expo-sqlite';

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

export const defaultCategories = [
  { id: 1, name: 'Food', period: CategoryPeriod.MONTHLY, goal: 400 },
  { id: 2, name: 'Transportation', period: CategoryPeriod.MONTHLY, goal: 60 },
  { id: 3, name: 'Phone', period: CategoryPeriod.YEARLY, goal: 100 },
  { id: 4, name: 'Utilities', period: CategoryPeriod.MONTHLY, goal: 100 },
  { id: 5, name: 'Self Care', period: CategoryPeriod.MONTHLY, goal: 100 },
];

export const removeCategory = async (tx: SQLTransactionAsync, id: number) => {
  if (id in defaultCategories.map((cat) => cat.id)) {
    console.warn('removing invalid category');
    return;
  }
  await tx.executeSqlAsync('DELETE FROM CATEGORIES', [id]);
};

// cannot update default category name
export const updateCategory = async (
  tx: SQLTransactionAsync,
  newCat: BudgetCategoryType,
) => {
  if (newCat.id in defaultCategories.map((cat) => cat.id)) {
    await tx.executeSqlAsync(
      'UPDATE CATEGORIES \
      SET period=?,\
          goal=?\
      WHERE id=?\
    ',
      [newCat.period, newCat.goal, newCat.id],
    );
  } else {
    await tx.executeSqlAsync(
      'UPDATE CATEGORIES \
      SET period=?,\
          goal=?,\
          name=?\
      WHERE id=?\
    ',
      [newCat.period, newCat.goal, newCat.goal, newCat.id],
    );
  }
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
    goal,
  }: { id?: number | null; name: string; period: CategoryPeriod; goal: number },
) => {
  try {
    if (id) {
      await tx.executeSqlAsync(
        'INSERT OR IGNORE into CATEGORIES(id,name,period, goal) values (?,?,?,?)',
        [id, name, period, goal],
      );
    } else {
      await tx.executeSqlAsync(
        'insert into CATEGORIES(name,period,goal) values (?,?,?)',
        [name, period, goal],
      );
    }
  } catch (err) {
    console.log(err);
    console.log('err in executing addCategory: ', name, period);
  }
};

export const setupCategories = async (tx: SQLTransactionAsync) => {
  // create categories table
  try {
    await tx.executeSqlAsync(
      'CREATE TABLE if not EXISTS CATEGORIES \
          (id integer primary key not null, \
            name TEXT, \
            period integer, \
            goal integer);',
    );
    // insert default categories
    defaultCategories.forEach((category) => {
      addCategory(tx, category);
    });
  } catch (err) {
    console.log('err initializing spending categories');
  }
};
