import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import NoteHome from '../screens/notes/NoteHome';
import BudgetStack from './BudgetStack';
import BottomTabBar from './components/BottomTabBar';
import { BottomTabsParamList } from './navigation';
import { Routes } from './routeConstants';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const Camera = () => {
  return <View className="h-[100%] bg-gray-700"></View>;
};
const Gallery = () => {
  return <View className="h-[100%] bg-gray-700"></View>;
};
const Settings = () => {
  return <View className="h-[100%] bg-gray-700"></View>;
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Budget}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => (
        <View>
          <StatusBar style={'light'} />
          <BottomTabBar {...props} />
        </View>
      )}
      backBehavior="history"
    >
      <Tab.Screen
        name={Routes.Budget}
        component={BudgetStack}
        options={{
          tabBarLabel: 'Budget',
        }}
      />

      <Tab.Screen
        name={Routes.NotesHome}
        component={NoteHome}
        options={{
          tabBarLabel: 'Note',
        }}
      />
      <Tab.Screen
        name={Routes.Camera}
        component={Camera}
        options={{
          tabBarLabel: 'Camera',
        }}
      />

      <Tab.Screen
        name={Routes.Gallery}
        component={Gallery}
        options={{
          tabBarLabel: 'Gallery',
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
