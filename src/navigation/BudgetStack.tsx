import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BudgetingHome from '../screens/budgeting/BudgetingHome';
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
    </Stack.Navigator>
  );
};
export default BudgetStack;
