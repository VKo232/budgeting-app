import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BudgetingHome from '../screens/budgeting/BudgetingHome';
import CategorySpendScreen from '../screens/budgeting/CategorySpendScreen';
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
    </Stack.Navigator>
  );
};
export default BudgetStack;
