import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DatabaseProvider from './lib/DatabaseProvider';
import RootStack from './navigation/RootStack';

export default function App() {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaProvider className="flex-1 bg-gray-900" style={{ width, height }}>
      <StatusBar style={'light'} />
      <DatabaseProvider>
        <NavigationContainer theme={DarkTheme}>
          <RootStack />
        </NavigationContainer>
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}
