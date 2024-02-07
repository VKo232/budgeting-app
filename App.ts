import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './src/App';

registerRootComponent(App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root'),
});
