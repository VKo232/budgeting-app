import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import clsx from 'clsx';
import { Text, View } from 'react-native';
import NoteHome from '../screens/notes/NoteHome';
import BudgetStack from './BudgetStack';
import { BottomTabsParamList } from './navigation';
import { Routes } from './routeConstants';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const Camera = () => {
  return <View></View>;
};
const Gallery = () => {
  return <View></View>;
};
const Settings = () => {
  return <View></View>;
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName={Routes.NotesHome}
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name={Routes.NotesHome}
        component={NoteHome}
        options={{
          tabBarLabel: 'Note',
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={clsx('justify-center', 'align-middle', 'bg-bgDark')}
              >
                <Ionicons
                  className={clsx(focused ? 'text-gray-600' : 'text-blue-950')}
                  name="document"
                  size={24}
                />
                <Text style={{ fontSize: 12, color: '#16247d' }}>Note</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.Gallery}
        component={Gallery}
        options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={clsx('justify-center', 'align-middle', 'bg-bgDark')}
              >
                <Ionicons
                  className={clsx(focused ? 'text-gray-600' : 'text-blue-950')}
                  name="images"
                  size={24}
                />
                <Text style={{ fontSize: 12, color: '#16247d' }}>Gallery</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.Camera}
        component={Camera}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={clsx('justify-center', 'align-middle', 'bg-bgDark')}
              >
                <Ionicons
                  className={clsx(focused ? 'text-gray-600' : 'text-blue-950')}
                  name="camera"
                  size={24}
                />
                <Text style={{ fontSize: 12, color: '#16247d' }}>Camera</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.Budget}
        component={BudgetStack}
        options={{
          tabBarLabel: 'Budget',
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={clsx('justify-center', 'align-middle', 'bg-bgDark')}
              >
                <Ionicons
                  className={clsx(focused ? 'text-gray-600' : 'text-blue-950')}
                  name="checkmark-circle"
                  size={24}
                />
                <Text style={{ fontSize: 12, color: '#16247d' }}>Budget</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={clsx('justify-center', 'align-middle', 'bg-bgDark')}
              >
                <Ionicons
                  className={clsx(focused ? 'text-gray-600' : 'text-blue-950')}
                  name="settings"
                  size={24}
                />
                <Text style={{ fontSize: 12, color: '#16247d' }}>Settings</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
