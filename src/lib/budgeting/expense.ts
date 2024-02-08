import { SQLTransactionAsync } from 'expo-sqlite';
import { Moment } from 'moment';

export type ExpenseType = {
  id: number;
  label: string; // max 50 chars
  date: Moment;
  amount: number; //
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
