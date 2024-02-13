import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';
import NoteHome from '../screens/notes/NoteHome';
import BudgetStack from './BudgetStack';
import { BottomTabsParamList } from './navigation';
import { Routes } from './routeConstants';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel as string;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            style={{ flex: 1 }}
            key={route.key}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label ?? ''}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

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
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={Routes.NotesHome}
    >
      <Tab.Screen
        name={Routes.NotesHome}
        component={NoteHome}
        options={{ tabBarLabel: 'Note' }}
      />
      <Tab.Screen
        name={Routes.Gallery}
        component={Gallery}
        options={{ tabBarLabel: 'Gallery' }}
      />
      <Tab.Screen
        name={Routes.Camera}
        component={Camera}
        options={{ tabBarLabel: 'Camera' }}
      />
      <Tab.Screen
        name={Routes.Budget}
        component={BudgetStack}
        options={{ tabBarLabel: 'Camera' }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
