import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './ThemeProvider';
import DatabaseProvider from './lib/DatabaseProvider';
import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <DatabaseProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </DatabaseProvider>
  );
}
