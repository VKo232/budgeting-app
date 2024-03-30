import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DatabaseContext } from '../../../lib/DatabaseProvider';
import { getCategoryTotal } from '../../../lib/budgeting/queries';
import { periodStartDate } from '../../../lib/dbUtils';
import { BudgetingStackParamList } from '../../../navigation/navigation';
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
    <View className="bg-gray-900 flex-1" style={{ paddingTop: top }}>
      <CategorySpendTitleBar
        name={categoryName}
        spent={spent}
        goalTotal={goal}
        period={period}
        color={color}
        navigation={navigation}
      />
      <ExpenseList categoryId={categoryId} period={period} />
    </View>
  );
};

export default CategorySpendScreen;
