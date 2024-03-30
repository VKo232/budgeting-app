import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import { BarColor, CategoryPeriod } from '../../../../lib/budgeting/category';
import { BudgetingStackParamList } from '../../../../navigation/navigation';
import GoalBar from '../../components/GoalBar';

type CategoryTitleBar = {
  name: string;
  spent: number;
  goalTotal: number;
  period: CategoryPeriod;
  navigation: NativeStackNavigationProp<
    BudgetingStackParamList,
    'BudgetingCategorySpend'
  >;
  color: BarColor;
};
const CategorySpendTitleBar = (props: CategoryTitleBar) => {
  const { name, spent, goalTotal, navigation, period, color } = props;
  const periodName = () => {
    if (period === CategoryPeriod.MONTHLY) {
      return 'month';
    } else if (period == CategoryPeriod.YEARLY) {
      return 'year';
    } else if (period == CategoryPeriod.WEEKLY) {
      return 'week';
    }
  };
  return (
    <View
      style={{
        paddingBottom: 5,
      }}
    >
      <View className=" flex-row justify-between">
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.pop()}
        >
          <Text className="text-blue-400 text-xl">Back</Text>
        </TouchableOpacity>

        <View style={{ flex: 4 }}>
          <Text className="color-white font-semibold text-4xl text-center flex-0">
            {props.name[0].toUpperCase() + name.slice(1)}
          </Text>

          <View className=" mt-2 w-30 justify-end items-center">
            <Text
              className="color-white mr-3 text-base mb-2"
              style={{ verticalAlign: 'top' }}
            >
              ${spent} of ${goalTotal} this {periodName()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text className="text-blue-400 text-xl">Edit</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full justify-center ">
        <GoalBar
          color={color}
          percentage={(spent / (goalTotal ?? 1)) * 100}
          className="h-3 w-[300px]"
        />
      </View>
    </View>
  );
};

export default CategorySpendTitleBar;
