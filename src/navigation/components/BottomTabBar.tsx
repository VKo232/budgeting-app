import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  StatusBar as RStatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const categoryMap = {
  Note: {
    icon: 'document',
  },
  Gallery: {
    icon: 'images',
  },
  Camera: {
    icon: 'camera',
  },
  Budget: {
    icon: 'checkmark-circle',
  },
  Settings: {
    icon: 'settings',
  },
} as const;

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      className={`flex-row justify-evenly bg-gray-800 border-t-[1px]`}
      style={{
        paddingVertical: 15,
      }}
    >
      <RStatusBar />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel as keyof typeof categoryMap;

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

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={label} className={`flex-1 justify-center`}>
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ alignItems: 'center' }}
            >
              <Ionicons
                className={`h-[24px]`}
                name={categoryMap[label].icon}
                size={24}
                color={!isFocused ? 'rgb(75 85 99)' : 'rgb(29 78 216)'}
              />
              <Text
                className={`mt-1 ${
                  isFocused ? 'text-blue-700' : 'text-gray-600'
                }`}
              >
                {label ?? '232323'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
