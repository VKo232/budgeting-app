import Ionicons from '@expo/vector-icons/Ionicons';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BarColor } from '../../../lib/budgeting/spendCategory';
import GoalBar from './GoalBar';

export type CategoryUsageBarProps = {
  onPress: () => void;
  label: string;
  goal: number;
  total: number;
  color: BarColor;
};
const CategoryUsageBar = ({
  onPress,
  label,
  goal,
  total,
  color,
}: CategoryUsageBarProps) => {
  const percentage = useMemo(() => {
    if (total > goal) {
      return 101; // prevent bad math problems
    }
    return Math.ceil((total / goal) * 100);
  }, [total, goal]);

  return (
    <View className={clsx('flex-1')}>
      <TouchableOpacity onPress={onPress}>
        <View className="flex-row px-4 py-6 align-middle">
          <Text className="text-gray-400 flex-1 text-xl font-semibold ">
            {label}
          </Text>
          <View className="flex-1 flex-row gap-3 ">
            <Text
              className="text-gray-300"
              style={{ flex: 1, textAlign: 'right' }}
            >{`${percentage}%`}</Text>
            <GoalBar
              className="h-3 self-center"
              style={{ flex: 3 }}
              percentage={percentage}
              color={percentage > 100 ? 'red' : color}
            />
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 50 }}
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Ionicons
                style={{ flex: 1, color: 'rgb(209 213 219)' }}
                name="add"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default CategoryUsageBar;
