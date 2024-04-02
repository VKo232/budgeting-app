import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddExpenseScreen from '../screens/budgeting/AddExpenseScreen/AddExpenseScreen';
import BudgetingHome from '../screens/budgeting/BudgetingHome';
import CategorySpendScreen from '../screens/budgeting/CategorySpendScreen/CategorySpendScreen';
import { BudgetingStackParamList } from './navigation';
import { Routes } from './routeConstants';

const Stack = createNativeStackNavigator<BudgetingStackParamList>();

const BudgetStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.BudgetingHome}
        options={{ headerShown: false }}
        component={BudgetingHome}
      />
      <Stack.Screen
        name={Routes.BudgetingCategorySpend}
        options={{ headerShown: false }}
        component={CategorySpendScreen}
      />
      <Stack.Screen
        name={Routes.BudgetingAddExpense}
        options={{ headerShown: false }}
        component={AddExpenseScreen}
      />
    </Stack.Navigator>
  );
};
export default BudgetStack;
