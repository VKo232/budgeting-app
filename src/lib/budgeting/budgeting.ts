import { SQLTransactionAsync } from 'expo-sqlite';
import { useContext } from 'react';
import { DatabaseContext } from '../DatabaseProvider';
import {
  AddExpenseType,
  ExpenseType,
  addExpense,
  removeExpense,
  setupExpenses,
  updateExpense,
} from './expense';
import {
  AddCategoryType,
  BudgetCategoryType,
  addCategory,
  removeCategory,
  setupCategories,
  updateCategory,
} from './spendCategory';

export const setupBudgeting = async (tx: SQLTransactionAsync) => {
  await setupCategories(tx);
  await setupExpenses(tx);
};

export const useBudgeting = () => {
  const db = useContext(DatabaseContext);

  return {
    removeExpense: async (id: number) => {
      db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await removeExpense(tx, id);
      });
    },
    updateExpense: async (expense: ExpenseType) => {
      db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await updateExpense(tx, expense);
      });
    },
    addExpense: async (expense: AddExpenseType) => {
      db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await addExpense(tx, expense);
      });
    },

    updateCategory: async (category: BudgetCategoryType) => {
      db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await updateCategory(tx, category);
      });
    },
    addCategory: async (category: AddCategoryType) => {
      db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await addCategory(tx, category);
      });
    },
    removeCategory: async (id: number) => {
      db.transactionAsync(async (tx: SQLTransactionAsync) => {
        await removeCategory(tx, id);
      });
    },
  };
};
