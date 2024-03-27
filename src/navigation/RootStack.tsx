import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BottomTabs from './BottomTabs';
import NotesDrawer from './NotesDrawer';
import { RootStackParamList } from './navigation';
import { Routes } from './routeConstants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.BottomTab}
        options={{
          headerShown: false,
        }}
        component={BottomTabs}
      />
      <Stack.Screen
        name={Routes.NotesNavigator}
        options={{ headerShown: false }}
        component={NotesDrawer}
      />
      <Stack.Screen name={Routes.Home} options={{}} component={HomeScreen} />
    </Stack.Navigator>
  );
};
export default RootStack;
