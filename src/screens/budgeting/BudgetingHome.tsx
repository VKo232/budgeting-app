import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TitleBar = () => {
  return <View className="h-[10vh]">Title screen</View>;
};

const Graph = () => {
  return <View className="h-[40vh]">Graph</View>;
};
const BudgetingCategories = () => {
  return <View>Graph</View>;
};

// type Props = NativeStackScreenProps<BudgetingStackParamList, 'BudgetingHome'>;

const BudgetingHome = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: top }} className="bg-gray-800">
      <TitleBar />
      <Graph />
      <BudgetingCategories />
    </ScrollView>
  );
};

export default BudgetingHome;
