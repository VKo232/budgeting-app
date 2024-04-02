import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DatabaseContext } from '../../lib/DatabaseProvider';
import { CategoryPeriod } from '../../lib/budgeting/category';
import {
  GetAllCategoriesResult,
  getAllCategorySpending,
  getPeriodGoalTotal,
} from '../../lib/budgeting/queries';
import { periodEndDate, periodStartDate } from '../../lib/dbUtils';
import AddExpenseModal from './components/AddExpenseModal';
import { BudgetHomeTitleBar } from './components/BudgetHomeTitleBar';
import CategoryUsage from './components/CategoryUsage';
import UsageGraph from './components/graphs/UsageGraph';

export type DisplayType = 'weekly' | 'monthly' | 'yearly' | 'all' | 'custom';
export type DisplayDateType = {
  startDate: Date;
  endDate: Date;
};

export type AddModalProps = { categoryId: number; categoryName: string };
const initialDates = {
  startDate: dayjs().subtract(1, 'month').toDate(),
  endDate: new Date(),
};

const BudgetingHome = () => {
  const { top } = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [displayType, setDisplayType] = useState<DisplayType>('monthly');
  const [displayDates, setDisplayDates] =
    useState<DisplayDateType>(initialDates);
  const [displayPeriod, setDisplayPeriod] = useState<number>(0);
  const [addModalProps, setAddModalProps] = useState<AddModalProps>({
    categoryId: 0,
    categoryName: '',
  });
  const db = useContext(DatabaseContext);

  const [goalTotal, setGoalTotal] = useState<number>(100);
  const [spent, setSpent] = useState<number>(0);

  useFocusEffect(useCallback(() => {}, [setDisplayType, setDisplayPeriod]));

  const calculateTotals = () => {
    const { startDate, endDate } = displayDates;
    if (displayType === 'monthly') {
      db.transactionAsync(async (tx) => {
        const res = await getPeriodGoalTotal(tx, CategoryPeriod.MONTHLY);
        setGoalTotal(res?.rows[0]['goal_total']);
        const res2 = (await getAllCategorySpending(tx, startDate, endDate))
          ?.rows as GetAllCategoriesResult[];
        const newSpent = res2.reduce((prev, item) => {
          if (
            item.period === CategoryPeriod.MONTHLY ||
            item.period === CategoryPeriod.WEEKLY
          )
            return prev + item.total;
          return prev;
        }, 0);
        setSpent(newSpent);
      });
    }
    if (displayType === 'yearly') {
      db.transactionAsync(async (tx) => {
        const res1 =
          (await getPeriodGoalTotal(tx, CategoryPeriod.MONTHLY))?.rows[0][
            'goal_total'
          ] ?? 0;
        const res2 =
          (await getPeriodGoalTotal(tx, CategoryPeriod.YEARLY))?.rows[0][
            'goal_total'
          ] ?? 0;
        const res3 =
          (await getPeriodGoalTotal(tx, CategoryPeriod.WEEKLY))?.rows[0][
            'goal_total'
          ] ?? 0;
        setGoalTotal(res1 * 12 + res2 + res3 * 52);
      });
    }
  };

  const calculateDisplayDates = () => {
    if (displayType === 'custom') {
      //
    } else if (displayType === 'all') {
      setDisplayDates({
        startDate: new Date('2022-01-01'),
        endDate: new Date(),
      });
      return;
    }
    let catPeriod: CategoryPeriod = 0;
    if (displayType === 'monthly') catPeriod = CategoryPeriod.MONTHLY;
    if (displayType === 'weekly') catPeriod = CategoryPeriod.WEEKLY;
    if (displayType === 'yearly') catPeriod = CategoryPeriod.YEARLY;

    setDisplayDates({
      startDate: periodStartDate(catPeriod, displayPeriod),
      endDate: periodEndDate(catPeriod, displayPeriod),
    });
  };

  useEffect(() => {
    calculateDisplayDates();
    calculateTotals();
  }, [displayType, displayPeriod]);

  return (
    <View
      style={{ paddingTop: top }}
      className={'text-textPrimary bg-gray-900 flex-1'}
    >
      <AddExpenseModal
        showModal={showModal}
        setShowModal={setShowModal}
        onDismiss={useCallback(() => {
          setDisplayDates({ ...displayDates });
        }, [displayDates])}
        {...addModalProps}
      />
      <BudgetHomeTitleBar
        displayType={displayType}
        displayData={displayDates}
        goalTotal={goalTotal}
        spent={spent}
      />
      <UsageGraph
        displayData={displayDates}
        displayType={displayType}
        displayPeriod={displayPeriod}
        goalTotal={goalTotal}
      />
      <CategoryUsage
        showModal={setShowModal}
        setShowModalProps={setAddModalProps}
        displayData={displayDates}
      />
    </View>
  );
};

export default BudgetingHome;
