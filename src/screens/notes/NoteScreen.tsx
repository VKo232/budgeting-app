import React from 'react';
import { Text, View } from 'react-native';
import { NoteDrawerScreenProps } from '../../navigation/navigation';

const NoteScreen = ({ navigation }: NoteDrawerScreenProps<'NoteScreen'>) => {
  return (
    <View>
      <Text>Hi</Text>
    </View>
  );
};

export default NoteScreen;
