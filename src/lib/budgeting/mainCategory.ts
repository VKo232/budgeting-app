import { SQLTransactionAsync } from 'expo-sqlite';
import { BarColor } from './category';

export type MainCategoryType = {
  id: number;
  name: string;
  color: BarColor;
};

export const defaultCategories = [
  {
    id: 0,
    name: 'Uncategorized',
    color: 'purple',
  },
  {
    id: 1,
    name: 'Food',
    color: 'orange',
  },
  {
    id: 2,
    name: 'Transportation',
    color: 'green',
  },
  {
    id: 3,
    name: 'Communications',
    color: 'blue',
  },
  {
    id: 4,
    name: 'Personal Care',
    color: 'purple',
  },
];

export const removeMainCategory = async (
  tx: SQLTransactionAsync,
  id: number,
) => {
  try {
    await tx.executeSqlAsync('DELETE FROM MAIN_CATEGORY WHERE id=? LIMIT 1;', [
      id,
    ]);
  } catch (err) {
    console.log(err);
  }
};

// cannot update default category name
export const updateMainCategory = async (
  tx: SQLTransactionAsync,
  newCat: MainCategoryType,
) => {
  try {
    await tx.executeSqlAsync(
      'UPDATE MAIN_CATEGORY \
         SET name=?,\
         color=?\
         WHERE id=?;',
      [newCat.name, newCat.color, newCat.id],
    );
  } catch (err) {
    console.log('err: update failed', newCat);
    console.log(err);
  }
};

export type AddMainCategoryType = {
  [K in keyof MainCategoryType]: K extends 'id'
    ? MainCategoryType[K] | null | undefined
    : MainCategoryType[K];
};

/**
 * adds expense with date, id, period
 * @param tx SQLTransactionAsync
 * @param param1 id, name, Categoryperiod
 * id is optional or will be ignored if exists
 */
export const addMainCategory = async (
  tx: SQLTransactionAsync,
  { id, name, color }: AddMainCategoryType,
) => {
  try {
    if (id) {
      await tx.executeSqlAsync(
        'INSERT OR IGNORE into MAIN_CATEGORY(id,name,color) values (?,?,?);',
        [id, name, color],
      );
    } else {
      await tx.executeSqlAsync(
        'INSERT into MAIN_CATEGORY(name, color) values (?,?);',
        [name, color],
      );
    }
  } catch (err) {
    console.log(err);
    console.log('err in executing addMainCategory: ', name);
  }
};

export const setupMainCategory = async (tx: SQLTransactionAsync) => {
  // create categories table
  try {
    // can remove exists then catch error to make sure table is initialized only once
    await tx.executeSqlAsync(
      'CREATE TABLE if not exists MAIN_CATEGORY \
          (id integer primary key not null, \
            name TEXT, \
            color TEXT);',
    );
    // insert default categories
    defaultCategories.forEach((category) => {
      addMainCategory(tx, { ...category, color: category.color as BarColor });
    });
  } catch (err) {
    console.log('err initializing main categories');
    console.log(err);
  }
};
