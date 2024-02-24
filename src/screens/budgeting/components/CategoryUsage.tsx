import clsx from 'clsx';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GoalBar, { BarColor } from './GoalBar';

type CategoryUsageProps = {
  showModal?: (_: boolean) => void;
};

const CategoryUsage = ({ showModal = () => {} }: CategoryUsageProps) => {
  const shouldShowModal = () => {
    showModal(true);
  };
  const usageData1: CategoryUsageBarType['usageData'] = {
    total: 500,
    current: 423.45,
    color: 'blue',
  };
  return (
    <View className={clsx('flex-row', 'justify-between')}>
      <CategoryUsageBar
        onPress={shouldShowModal}
        label={'category 1'}
        usageData={usageData1}
      />
    </View>
  );
};

type CategoryUsageBarType = {
  onPress: () => void;
  label: string;
  usageData: { total: number; current: number; color: BarColor };
};
const CategoryUsageBar = ({
  onPress,
  label,
  usageData,
}: CategoryUsageBarType) => {
  const percentage = useMemo(() => {
    if (usageData.current > usageData.total) {
      return 101; // prevent bad math problems
    }
    return Math.ceil((usageData.current / usageData.total) * 100);
  }, [usageData]);

  return (
    <View className={clsx('flex-1')}>
      <TouchableOpacity onPress={onPress}>
        <View className=" flex-row bg-slate-200 px-4 py-6 align-middle">
          <Text className="text-gray-400 flex-1 text-xl font-semibold ">
            {label}
          </Text>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
          >
            <Text
              className="mr-2"
              style={{ flex: 1, textAlign: 'right' }}
            >{`${percentage}%`}</Text>
            <GoalBar
              percentage={percentage}
              style={{ flex: 1 }}
              color={percentage > 100 ? 'red' : usageData.color}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryUsage;
