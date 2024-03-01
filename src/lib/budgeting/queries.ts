import { SQLTransactionAsync } from 'expo-sqlite';
import { BarColor } from './spendCategory';

export type GetAllCategoriesResult = {
  categoryId: number;
  color: BarColor;
  goal: number;
  id: number;
  name: string;
  period: number;
  total: number;
};
const queryAllCategorySpending =
  "Select *,Coalesce(total,0) as 'total',Coalesce(categoryId,id)as 'categoryId'  from categories \
  left join (\
    SELECT\
      SUM(amount) as 'total',\
      categoryId\
    FROM\
      EXPENSES\
    GROUP BY\
      categoryId\
  ) as e1 on e1.categoryId = categories.id;";

const queryGetAllCategories = 'Select * from CATEGORIES';

export const getAllCategories = async (tx: SQLTransactionAsync) => {
  try {
    return await tx.executeSqlAsync(queryGetAllCategories, []);
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
