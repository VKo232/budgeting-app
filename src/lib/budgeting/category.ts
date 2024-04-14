import { SQLTransactionAsync } from 'expo-sqlite';

export enum CategoryPeriod {
  YEARLY = 0,
  MONTHLY = 1,
  WEEKLY = 2,
}

export const isCategoryPeriod = (val: number): val is CategoryPeriod => {
  return val in CategoryPeriod;
};

export type CategoryType = {
  id: number;
  name: string;
  period: CategoryPeriod;
  goal: number; // goal is integer 100 represents $1
  color: BarColor;
  mainCategory: number;
};

export type BarColor = 'green' | 'blue' | 'purple' | 'orange' | 'red';

export const defaultCategories: CategoryType[] = [
  {
    id: 1,
    name: 'Food',
    period: CategoryPeriod.MONTHLY,
    goal: 400,
    color: 'orange',
    mainCategory: 1,
  },
  {
    id: 2,
    name: 'Transportation',
    period: CategoryPeriod.MONTHLY,
    goal: 60,
    color: 'green',
    mainCategory: 2,
  },
  {
    id: 3,
    name: 'Phone',
    period: CategoryPeriod.YEARLY,
    goal: 100,
    color: 'blue',
    mainCategory: 3,
  },
  {
    id: 4,
    name: 'Utilities',
    period: CategoryPeriod.MONTHLY,
    goal: 100,
    color: 'blue',
    mainCategory: 0,
  },
  {
    id: 5,
    name: 'Self Care',
    period: CategoryPeriod.MONTHLY,
    goal: 100,
    color: 'purple',
    mainCategory: 4,
  },
];

export const removeCategory = async (tx: SQLTransactionAsync, id: number) => {
  try {
    if (id in defaultCategories.map((cat) => cat.id)) {
      console.warn('removing invalid category');
      return;
    }
    await tx.executeSqlAsync('DELETE FROM CATEGORIES WHERE id=? LIMIT 1;', [
      id,
    ]);
  } catch (err) {
    console.log(err);
  }
};

// cannot update default category name
export const updateCategory = async (
  tx: SQLTransactionAsync,
  newCat: CategoryType,
) => {
  try {
    await tx.executeSqlAsync(
      'UPDATE CATEGORIES \
         SET period=?,\
             goal=?,\
             name=?,\
             color=?,\
             mainCategory=?\
         WHERE id=?;',
      [
        newCat.period,
        newCat.goal,
        newCat.name,
        newCat.color,
        newCat.mainCategory,
        newCat.id,
      ],
    );
  } catch (err) {
    console.log('err: update failed', newCat);
    console.log(err);
  }
};

export type AddCategoryType = {
  [K in keyof CategoryType]: K extends 'id'
    ? CategoryType[K] | null | undefined
    : CategoryType[K];
};
/**
 * adds expense with date, id, period
 * @param tx SQLTransactionAsync
 * @param param1 id, name, Categoryperiod
 * id is optional or will be ignored if exists
 */
export const addCategory = async (
  tx: SQLTransactionAsync,
  { id, name, period, goal, color, mainCategory }: AddCategoryType,
) => {
  try {
    if (id) {
      await tx.executeSqlAsync(
        'INSERT OR IGNORE into CATEGORIES (id,name,period,goal,mainCategory, color) values (?,?,?,?,?,?);',
        [id, name, period, goal, mainCategory, color],
      );
    } else {
      await tx.executeSqlAsync(
        'insert into CATEGORIES (name,period,goal,mainCategory, color) values (?,?,?,?,?);',
        [name, period, goal, mainCategory, color],
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
    // can remove exists then catch error to make sure table is initialized only once
    await tx.executeSqlAsync(
      `CREATE TABLE if not EXISTS CATEGORIES
          (id integer primary key not null,
            name TEXT,
            period INTEGER,
            goal INTEGER,
            color TEXT,
            mainCategory INTEGER,
            FOREIGN KEY(mainCategory) REFERENCES MAIN_CATEGORY(ID));`,
    );
    // insert default categories
    await defaultCategories.forEach(async (category) => {
      await addCategory(tx, category);
    });
  } catch (err) {
    console.log(err);
    console.log('err initializing spending categories');
  }
};
