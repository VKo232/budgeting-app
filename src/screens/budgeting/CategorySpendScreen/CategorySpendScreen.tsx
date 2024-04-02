import { useFocusEffect } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useCallback, useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DatabaseContext } from '../../../lib/DatabaseProvider';
import { getCategoryTotal } from '../../../lib/budgeting/queries';
import { periodStartDate } from '../../../lib/dbUtils';
import { BudgetingStackParamList } from '../../../navigation/navigation';
import { Routes } from '../../../navigation/routeConstants';
import ExpenseList from './components/ExpenseList';
import CategorySpendTitleBar from './components/Titlebar';

type Props = NativeStackScreenProps<
  BudgetingStackParamList,
  'BudgetingCategorySpend'
>;

const CategorySpendScreen = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();
  const {
    id: categoryId,
    name: categoryName,
    period,
    goal,
    color,
  } = route.params.category;
  const [spent, setSpent] = useState<number>(0);
  const db = useContext(DatabaseContext);

  useFocusEffect(
    useCallback(() => {
      db.transactionAsync(async (tx) => {
        getCategoryTotal(tx, categoryId, periodStartDate(period)).then((val) =>
          setSpent(val?.rows[0]?.total ?? 0),
        );
      });
    }, [categoryId]),
  );
  return (
    <View className="bg-gray-900 flex-1" style={{ paddingTop: top, flex: 1 }}>
      <CategorySpendTitleBar
        name={categoryName}
        spent={spent}
        goalTotal={goal}
        period={period}
        color={color}
        navigation={navigation}
      />
      <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
        <HeaderComponent
          navigation={navigation}
          categoryId={categoryId}
          categoryName={categoryName}
        />
        <ScrollView horizontal contentContainerStyle={{ width: '100%' }}>
          <ExpenseList categoryId={categoryId} period={period} />
        </ScrollView>
      </ScrollView>
    </View>
  );
};
const HeaderComponent = ({
  navigation,
  categoryId,
  categoryName,
}: {
  navigation: NativeStackNavigationProp<BudgetingStackParamList>;
  categoryId: number;
  categoryName: string;
}) => {
  return (
    <View style={{ marginTop: 20 }}>
      <View className="flex-row justify-between px-6">
        <Text className="text-2xl text-white">Expense List</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.BudgetingAddExpense, {
              categoryId,
              categoryName,
            });
          }}
        >
          <Text className="text-2xl text-blue-400">Add</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full mt-2 bg-slate-400 h-[1px]"></View>
    </View>
  );
};

export default CategorySpendScreen;
