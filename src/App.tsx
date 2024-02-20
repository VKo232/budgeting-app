import { NavigationContainer } from '@react-navigation/native';
import DatabaseProvider from './lib/DatabaseProvider';
import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </DatabaseProvider>
  );
}
