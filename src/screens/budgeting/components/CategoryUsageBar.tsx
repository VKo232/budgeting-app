import Ionicons from '@expo/vector-icons/Ionicons';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BarColor } from '../../../lib/budgeting/category';
import { AddModalProps } from '../BudgetingHome';
import GoalBar from './GoalBar';

export type CategoryUsageBarProps = {
  onAdd: (_: AddModalProps) => void;
  onPress: () => void;
  label: string;
  goal: number;
  total: number;
  color: BarColor;
  id: number;
  descriptor?: string;
};
const CategoryUsageBar = ({
  onAdd,
  onPress,
  label,
  goal,
  total,
  color,
  descriptor,
  id,
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
        <View className="flex-row px-4 py-5">
          <Text
            className="text-gray-400 flex-1 text-xl font-semibold h-full"
            style={{ verticalAlign: 'middle' }}
          >
            {label}
          </Text>
          <View className="flex-1 flex-row gap-3">
            <View className="flex-1 flex-col">
              <Text
                className="text-gray-300 mb-2"
                style={{ flex: 1, textAlign: 'right' }}
              >
                {descriptor ? descriptor : `${percentage}%`}
              </Text>
              <GoalBar
                className="h-3"
                style={{ flex: 1 }}
                percentage={percentage}
                color={percentage > 100 ? 'red' : color}
              />
            </View>
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 50 }}
              style={{
                flex: 0,
              }}
              onPress={() => onAdd({ categoryId: id, categoryName: label })}
            >
              <Ionicons
                style={{
                  flex: 1,
                  color: 'rgb(209 213 219)',
                  verticalAlign: 'bottom',
                }}
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
