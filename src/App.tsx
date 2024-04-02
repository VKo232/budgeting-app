import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DatabaseProvider from './lib/DatabaseProvider';
import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <SafeAreaProvider className="flex-1 bg-gray-900">
      <StatusBar style={'light'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{ flex: 1 }}
      >
        <DatabaseProvider>
          <NavigationContainer theme={DarkTheme}>
            <RootStack />
          </NavigationContainer>
        </DatabaseProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
