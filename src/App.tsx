import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DatabaseProvider from './lib/DatabaseProvider';
import RootStack from './navigation/RootStack';

export default function App() {
  // Appearance.setColorScheme('dark');

  return (
    <SafeAreaProvider>
      <DatabaseProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}
