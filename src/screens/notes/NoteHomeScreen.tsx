import React from 'react';
import { Text, View } from 'react-native';
import { NoteDrawerScreenProps } from '../../navigation/navigation';

const NoteHome = ({ navigation }: NoteDrawerScreenProps<'noteHome'>) => {
  navigation.canGoBack();

  return (
    <View>
      <Text>Hi</Text>
    </View>
  );
};

export default NoteHome;
