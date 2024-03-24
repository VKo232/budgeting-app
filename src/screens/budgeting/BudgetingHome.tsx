import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddExpenseModal from './components/AddExpenseModal';
import CategoryUsage from './components/CategoryUsage';
import UsageGraph from './components/graphs/UsageGraph';

export type DisplayType = 'weekly' | 'monthly' | 'yearly' | 'all' | 'custom';
export type DisplayDateType = {
  startDate: Date;
  endDate: Date;
};

const TitleBar = () => {
  return (
    <View className="h-[5vh]">
      <Text className="color-white font-semibold text-xl text-center">
        Monthly Spending
      </Text>
    </View>
  );
};

export type AddModalProps = { categoryId: number; categoryName: string };

const BudgetingHome = () => {
  const initialDates = {
    startDate: dayjs().subtract(1, 'month').toDate(),
    endDate: new Date(),
  };
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

  useEffect(() => {
    if (displayType === 'monthly') {
      setDisplayDates({
        startDate: dayjs()
          .subtract(displayPeriod, 'months')
          .startOf('month')
          .toDate(),
        endDate: dayjs()
          .subtract(displayPeriod, 'months')
          .endOf('month')
          .toDate(),
      });
    }
    if (displayType === 'all') {
      setDisplayDates({
        startDate: new Date('2022-01-01'),
        endDate: new Date(),
      });
    }
    if (displayType === 'yearly') {
      setDisplayDates({
        startDate: dayjs()
          .subtract(displayPeriod + 1, 'years')
          .toDate(),
        endDate: dayjs().subtract(displayPeriod, 'years').toDate(),
      });
    }
    if (displayType === 'custom') {
      //
    }
    if (displayType === 'weekly') {
      setDisplayDates({
        startDate: dayjs()
          .subtract(displayPeriod + 1, 'weeks')
          .toDate(),
        endDate: dayjs().subtract(displayPeriod, 'weeks').toDate(),
      });
    }
  }, [displayType, displayPeriod]);
  const xLabel = useMemo(() => {
    if (displayType === 'monthly') {
      return dayjs().subtract(displayPeriod, 'months').format('MMMM');
    }
    return dayjs().subtract(displayPeriod, 'months').format('MMMM');
  }, [displayType, displayPeriod]);
  return (
    <View
      style={{ paddingTop: top }}
      className={'text-textPrimary bg-gray-900 flex-1'}
    >
      <AddExpenseModal
        showModal={showModal}
        setShowModal={setShowModal}
        {...addModalProps}
      />
      <TitleBar />
      <UsageGraph
        displayData={displayDates}
        displayType={displayType}
        xLabel={xLabel}
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
