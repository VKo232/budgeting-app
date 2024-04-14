import { Text, View } from 'react-native';
import { DisplayType } from '../BudgetingHome';
import GoalBar from './GoalBar';

export const BudgetHomeTitleBar = ({
  displayType,
  goalTotal,
  spent,
}: {
  displayType: DisplayType;
  displayData: { startDate: Date; endDate: Date };
  spent: number;
  goalTotal: number;
}) => {
  return (
    <View className="h-[11vh]">
      <View className="flex-1">
        <Text className="color-white font-semibold text-xl text-center flex-0">
          {displayType[0].toUpperCase() + displayType.slice(1)} Spending
        </Text>

        <View className=" my-4 mt-2 w-30 justify-end items-center">
          <Text
            className="color-white mr-3 text-xl mb-2"
            style={{ verticalAlign: 'top' }}
          >
            ${spent.toFixed(2)} of ${goalTotal}
          </Text>
          <GoalBar
            color="green"
            percentage={(spent / goalTotal) * 100}
            className="h-3 w-[300px] mb-2"
          />
        </View>
      </View>
    </View>
  );
};
