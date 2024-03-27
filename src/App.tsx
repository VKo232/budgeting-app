import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DatabaseProvider from './lib/DatabaseProvider';
import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <SafeAreaProvider className="flex-1 bg-gray-800">
      <DatabaseProvider>
        <NavigationContainer theme={DarkTheme}>
          <RootStack />
        </NavigationContainer>
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}
