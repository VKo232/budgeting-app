import { SQLTransactionAsync } from 'expo-sqlite';
import { BarColor } from './category';

export type GetAllCategoriesResult = {
  categoryId: number;
  color: BarColor;
  goal: number;
  id: number;
  name: string;
  period: number;
  total: number;
};

export type GetAllMainCategorySpendingResult = {
  categoryId: number;
  color: BarColor;
  goal: number;
  id: number;
  name: string; // main category name
  label: string; // category name
  period: number;
  total: number;
};

const queryAllCategorySpending =
  "Select *,Coalesce(total,0) as 'total',Coalesce(categoryId,id)as 'categoryId' from categories \
  left join (\
    SELECT\
      SUM(amount) as 'total',\
      categoryId\
    FROM\
      EXPENSES\
    GROUP BY\
      categoryId\
  ) as e1 on e1.categoryId = categories.id;";

const queryAllMainCategorySpending = `Select *, MAIN_CATEGORIES.name as 'name', c1.name as 'label'  
from MAIN_CATEGORIES
INNER JOIN (${queryAllCategorySpending}) as c1 
on c1.main_category=MAIN_CATEGORIES.id`;

const queryGetAllCategories = 'Select * from CATEGORIES';

export const getAllCategories = async (tx: SQLTransactionAsync) => {
  try {
    return await tx.executeSqlAsync(queryGetAllCategories, []);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllMainCategorySpending = async (tx: SQLTransactionAsync) => {
  try {
    return await tx.executeSqlAsync(queryAllMainCategorySpending, []);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllCategorySpending = async (tx: SQLTransactionAsync) => {
  try {
    return await tx.executeSqlAsync(queryAllCategorySpending, []);
  } catch (err) {
    console.log(err);
    return null;
  }
};
