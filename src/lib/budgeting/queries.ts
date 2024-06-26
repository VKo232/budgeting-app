import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { SQLTransactionAsync } from 'expo-sqlite';
import { dateToDbString } from '../dbUtils';
import { BarColor, CategoryPeriod } from './category';

dayjs.extend(utc);

export type GetAllCategoriesResult = {
  categoryId: number;
  color: BarColor;
  goal: number;
  id: number;
  name: string;
  period: number;
  total: number;
  mainCategory: number;
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

const queryAllCategorySpending = `Select *,Coalesce(total,0) as 'total', Coalesce(categoryId,id) as 'categoryId' from categories
  left join (
    SELECT
      SUM(amount) as 'total',
      categoryId
    FROM
      EXPENSES
    WHERE 
      date >= ? and
      date <= ?
    GROUP BY
      categoryId
  ) as e1 on e1.categoryId = categories.id 
  ORDER BY total DESC;`;
export const getAllCategorySpending = async (
  tx: SQLTransactionAsync,
  startDate?: Date,
  endDate?: Date,
) => {
  try {
    if (!startDate) {
      startDate = new Date('2022-01-01');
    }
    if (!endDate) {
      endDate = new Date();
    }
    return await tx.executeSqlAsync(queryAllCategorySpending, [
      dateToDbString(startDate),
      dateToDbString(endDate),
    ]);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const queryAllMainCategorySpending = `Select *, MAIN_CATEGORIES.name as 'name', c1.name as 'label'  
from MAIN_CATEGORIES
INNER JOIN (${queryAllCategorySpending}) as c1 
on c1.main_category=MAIN_CATEGORIES.id`;
export const getAllMainCategorySpending = async (
  tx: SQLTransactionAsync,
  startDate?: Date,
  endDate?: Date,
) => {
  try {
    if (!startDate) {
      startDate = new Date('2022-01-01');
    }
    if (!endDate) {
      endDate = new Date();
    }

    return await tx.executeSqlAsync(queryAllMainCategorySpending, [
      dateToDbString(startDate),
      dateToDbString(endDate),
    ]);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const queryGetAllCategories = 'Select * from CATEGORIES';
export const getAllCategories = async (tx: SQLTransactionAsync) => {
  try {
    return await tx.executeSqlAsync(queryGetAllCategories, []);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const queryGetTotalExpenses = `
Select new_date as date, MAX(total) as total FROM 
  (Select *, coalesce(SUM(amount) over (ORDER BY date),0) as total, date(date) as new_date
  FROM EXPENSES
  WHERE date >= ? and date <= ?
  ORDER BY date) AS T1
GROUP BY T1.new_date
`;
export const getRunningTotal = async (
  tx: SQLTransactionAsync,
  startDate?: Date,
  endDate?: Date,
) => {
  try {
    if (!startDate) {
      startDate = new Date('2022-01-01');
    }
    if (!endDate) {
      endDate = new Date();
    }
    return await tx.executeSqlAsync(queryGetTotalExpenses, [
      dateToDbString(startDate),
      dateToDbString(endDate),
    ]);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const queryPeriodGoalTotal = `
SELECT SUM(goal) as goal_total 
FROM CATEGORIES 
WHERE period= ?`;

export const getPeriodGoalTotal = async (
  tx: SQLTransactionAsync,
  period: CategoryPeriod,
) => {
  try {
    return await tx.executeSqlAsync(queryPeriodGoalTotal, [period]);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const queryCategory = `
SELECT * 
FROM CATEGORIES 
WHERE id=?
`;

export const getCategory = async (
  tx: SQLTransactionAsync,
  categoryId: number,
) => {
  try {
    return await tx.executeSqlAsync(queryCategory, [categoryId]);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const queryCategoryTotal = `
SELECT COALESCE(SUM(amount),0) as total 
FROM expenses 
WHERE categoryId=? and date >= ? and date <= ? 
`;

export const getCategoryTotal = async (
  tx: SQLTransactionAsync,
  categoryId: number,
  startDate?: Date,
  endDate?: Date,
) => {
  try {
    if (!startDate) {
      startDate = new Date('2022-01-01');
    }
    if (!endDate) {
      endDate = new Date();
    }

    return await tx.executeSqlAsync(queryCategoryTotal, [
      categoryId,
      dateToDbString(startDate),
      dateToDbString(endDate),
    ]);
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const queryAllExpenses = `
SELECT * 
FROM expenses 
WHERE categoryId=? and date >= ? and date <= ? 
ORDER BY date DESC
`;

export const getAllExpenses = async (
  tx: SQLTransactionAsync,
  categoryId: number,
  startDate?: Date,
  endDate?: Date,
) => {
  try {
    if (!startDate) {
      startDate = new Date('2022-01-01');
    }
    if (!endDate) {
      endDate = new Date();
    }

    return await tx.executeSqlAsync(queryAllExpenses, [
      categoryId,
      dateToDbString(startDate),
      dateToDbString(endDate),
    ]);
  } catch (err) {
    console.log(err);
    return null;
  }
};
