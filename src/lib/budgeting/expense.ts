import dayjs from 'dayjs';
import { SQLTransactionAsync } from 'expo-sqlite';

import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export type ExpenseType = {
  id: number;
  label: string; // max 50 chars
  date: Date;
  amount: number;
  categoryId: number;
};

export type AddExpenseType = Omit<ExpenseType, 'id'>;

export const addExpense = async (
  tx: SQLTransactionAsync,
  exp: AddExpenseType,
) => {
  try {
    await tx.executeSqlAsync(
      'insert into EXPENSES(label,date,amount,categoryId) values (?,?,?,?);',
      [
        exp.label,
        dayjs(exp.date).format('YYYY-MM-DD HH:mm:ss'),
        exp.amount,
        exp.categoryId,
      ],
    );
  } catch (err) {
    console.log(err);
    console.log('err: inserting expense');
  }
};

export const removeExpense = async (tx: SQLTransactionAsync, id: number) => {
  try {
    await tx.executeSqlAsync('DELETE FROM EXPENSES WHERE id=?;', [id]);
  } catch (err) {
    console.log(err);
    console.log('err: removing expense');
  }
};

export const updateExpense = async (
  tx: SQLTransactionAsync,
  exp: ExpenseType,
) => {
  try {
    await tx.executeSqlAsync(
      'UPDATE EXPENSES \
       SET amount=?,\
           date=?,\
           lablel=?,\
           categoryId=?\
       WHERE id=?;',
      [
        exp.amount,
        dayjs(exp.date).format('YYYY-MM-DD HH:mm:ss'),
        exp.label,
        exp.categoryId,
        exp.id,
      ],
    );
  } catch (err) {
    console.log(err);
    console.log('err: updating expense');
  }
};

export const setupExpenses = async (tx: SQLTransactionAsync) => {
  // expenses table
  try {
    await tx.executeSqlAsync(
      'create table if not exists EXPENSES \
              (id INTEGER primary key not null, \
                categoryId INTEGER, \
                label TEXT,\
                amount INTEGER,\
                date DATETIME,\
                FOREIGN KEY(categoryId) REFERENCES CATEGORIES(id));',
    );
  } catch (err) {
    console.log('err initializing db');
  }
};
