import { SQLTransactionAsync } from 'expo-sqlite';
import { Moment } from 'moment';
import { useContext } from 'react';
import { DatabaseContext } from '../lib/DatabaseProvider';

const useBudgeting = () => {
  const db = useContext(DatabaseContext);

  const addExpense = async (
    categoryId: string,
    amount: number,
    date: Moment,
  ) => {
    return await db.transactionAsync(async (tx: SQLTransactionAsync) => {
      await tx.executeSqlAsync(
        'insert into expenses (categoryId,amount,date) values (?,?,?) ',
        [categoryId, amount, date.toISOString()],
      );
    }, false);
  };
  const removeExpense = async (expenseId: string) => {
    return await db.transactionAsync(async (tx: SQLTransactionAsync) => {
      await tx.executeSqlAsync('DELETE FROM expenses WHERE id=?', [expenseId]);
    }, false);
  };

  return { addExpense, removeExpense };
};

export default useBudgeting;
