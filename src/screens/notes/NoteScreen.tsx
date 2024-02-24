import { Text, TouchableOpacity, View } from 'react-native';
import { NoteDrawerScreenProps } from '../../navigation/navigation';
import { Routes } from '../../navigation/routeConstants';

const NoteScreen = ({ navigation }: NoteDrawerScreenProps<'NoteScreen'>) => {
  return (
    <View>
      <Text>Hi</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Routes.BudgetingHome);
        }}
      >
        Go somewhere
      </TouchableOpacity>
    </View>
  );
};

export default NoteScreen;
