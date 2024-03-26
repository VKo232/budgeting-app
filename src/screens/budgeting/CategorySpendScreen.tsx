import { Text, View } from 'react-native';
import GoalBar from './components/GoalBar';

const TitleBar = () => {
  return (
    <View>
      <Text>title bar</Text>
    </View>
  );
};
const CategorySpendScreen = () => {
  return (
    <View className="bg-gray-900">
      <TitleBar />
      <GoalBar color={'green'} percentage={70} />
    </View>
  );
};

export default CategorySpendScreen;
