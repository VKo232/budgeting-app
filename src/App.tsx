import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './ThemeProvider';
import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
