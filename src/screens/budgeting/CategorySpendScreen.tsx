import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BudgetingStackParamList } from '../../navigation/navigation';
import GoalBar from './components/GoalBar';

type CategoryTitleBar = {
  name: string;
  spent: number;
  goalTotal: number;
  navigation: NativeStackNavigationProp<
    BudgetingStackParamList,
    'BudgetingHome'
  >;
};
const TitleBar = (props: CategoryTitleBar) => {
  const { name, spent, goalTotal, navigation } = props;

  return (
    <View className="bg-gray-800 h-[11vh] flex-row justify-between">
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => navigation.pop()}
      >
        <Text className="text-white text-lg">Back</Text>
      </TouchableOpacity>

      <View style={{ flex: 4 }}>
        <Text className="color-white font-semibold text-xl text-center flex-0">
          {props.name[0].toUpperCase() + name.slice(1)}
        </Text>

        <View className=" my-4 mt-2 w-30 justify-end items-center">
          <Text
            className="color-white mr-3 text-xl mb-2"
            style={{ verticalAlign: 'top' }}
          >
            ${spent} of ${goalTotal}
          </Text>
          <GoalBar
            color="green"
            percentage={(spent / goalTotal) * 100}
            className="h-3 bg-orange w-[200px] mb-2"
          />
        </View>
      </View>
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text className="text-white text-lg">Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

type Props = NativeStackScreenProps<BudgetingStackParamList, 'BudgetingHome'>;

const CategorySpendScreen = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <View className="bg-gray-800 flex-1" style={{ paddingTop: top }}>
      <TitleBar
        name={'Phone'}
        spent={12}
        goalTotal={100}
        navigation={navigation}
      />
    </View>
  );
};

export default CategorySpendScreen;
