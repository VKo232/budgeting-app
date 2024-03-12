import { ResultSet, SQLTransactionAsync } from 'expo-sqlite';
import { useContext } from 'react';
import { DatabaseContext } from '../DatabaseProvider';
import {
  AddCategoryType,
  CategoryType,
  addCategory,
  removeCategory,
  updateCategory,
} from './category';
import {
  AddExpenseType,
  ExpenseType,
  addExpense,
  removeExpense,
  updateExpense,
} from './expense';
import { getAllCategorySpending } from './queries';

const useBudgeting = () => {
  const db = useContext(DatabaseContext);

  return {
    getAllCategorySpending: (callback: (_: ResultSet | null) => void) => {
      return db.transactionAsync(async (tx: SQLTransactionAsync) => {
        const results = await getAllCategorySpending(tx);
        callback(results);
      });
    },
    removeExpense: async (id: number) => {
      await db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await removeExpense(tx, id);
      });
    },
    updateExpense: async (expense: ExpenseType) => {
      await db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await updateExpense(tx, expense);
      });
    },
    addExpense: async (expense: AddExpenseType) => {
      await db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await addExpense(tx, expense);
      });
    },

    updateCategory: async (category: CategoryType) => {
      await db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await updateCategory(tx, category);
      });
    },
    addCategory: async (category: AddCategoryType) => {
      await db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await addCategory(tx, category);
      });
    },
    removeCategory: async (id: number) => {
      await db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await removeCategory(tx, id);
      });
    },
  };
};

export default useBudgeting;
