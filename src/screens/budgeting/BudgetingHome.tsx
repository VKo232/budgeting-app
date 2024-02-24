import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoryUsage from './components/CategoryUsage';

const TitleBar = () => {
  return (
    <View className="h-[10vh]">
      <Text>Title bar</Text>
    </View>
  );
};

const Graph = () => {
  return (
    <View className="h-[40vh]">
      <Text>Graph</Text>
    </View>
  );
};

// type Props = NativeStackScreenProps<BudgetingStackParamList, 'BudgetingHome'>;

const BudgetingHome = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ paddingTop: top }}
      className={'text-textPrimary bg-gray-700'}
    >
      <TitleBar />
      <Graph />
      <CategoryUsage />
    </ScrollView>
  );
};

export default BudgetingHome;
