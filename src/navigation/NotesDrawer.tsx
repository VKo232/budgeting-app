import { createDrawerNavigator } from '@react-navigation/drawer';
import NoteHomeScreen from '../screens/notes/NoteHome';
import NoteScreen from '../screens/notes/NoteScreen';
import { DrawerParamList } from './navigation';
import { Routes } from './routeConstants';

const Drawer = createDrawerNavigator<DrawerParamList>();

const NotesDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={Routes.NotesHome} component={NoteHomeScreen} />
      <Drawer.Screen name={Routes.Note} component={NoteScreen} />
    </Drawer.Navigator>
  );
};

export default NotesDrawer;
