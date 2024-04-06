import { Slider } from '@miblanchard/react-native-slider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryPeriod } from '../../../lib/budgeting/category';
import { BudgetingStackParamList } from '../../../navigation/navigation';

type Props = NativeStackScreenProps<
  BudgetingStackParamList,
  'BudgetingCategorySpend'
>;

const EditCategoryScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;
  const { name, period, goal } = category;
  const { top } = useSafeAreaInsets();
  const [newGoal, setNewGoal] = useState<number | undefined>(goal);
  const onValueChange = (val: number) => {
    setNewGoal(Number(val.toFixed(2)));
  };
  const data: { frequency: CategoryPeriod; name: string }[] = [
    { frequency: CategoryPeriod.WEEKLY, name: 'Weekly' },
    { frequency: CategoryPeriod.MONTHLY, name: 'Monthly' },
    { frequency: CategoryPeriod.YEARLY, name: 'Yearly' },
  ];
  const [newPeriod, setNewPeriod] = useState<
    { frequency: CategoryPeriod; name: string } | undefined
  >(data.find(({ frequency }) => frequency === period));
  return (
    <View className="bg-gray-900 flex-1" style={{ paddingTop: top, flex: 1 }}>
      <View
        style={{
          paddingBottom: 5,
        }}
      >
        <View className=" flex-row justify-between">
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.pop()}
          >
            <Text className="text-blue-400 text-xl">Back</Text>
          </TouchableOpacity>

          <View style={{ flex: 4 }}>
            <Text className="color-gray-500 font-semibold text-4xl text-center flex-0">
              Edit Category
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            className="color-gray-500 p-4 border-gray-500 rounded-xl mt-10 text-2xl"
            style={{ borderWidth: 1, marginHorizontal: 40, height: 50 }}
            defaultValue={name}
          />
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              flexDirection: 'row',
              marginTop: 40,
              marginLeft: 40,
              marginRight: 20,
            }}
          >
            <View className="flex-1" style={{ height: 20 }}>
              <Text className="text-gray-500 text-base">Goal</Text>
              <View>
                <Slider
                  minimumValue={0}
                  maximumValue={1000}
                  value={goal}
                  onValueChange={(val) => {
                    onValueChange(val[0]);
                  }}
                />
              </View>
            </View>
            <TextInput
              className="color-gray-500 border-gray-500 rounded-xl text-2xl"
              style={{
                borderWidth: 1,
                height: 50,
                padding: 10,
                marginLeft: 20,
                width: 110,
              }}
              keyboardType="decimal-pad"
              defaultValue={`$${goal}`}
              onChange={(e) => {
                onValueChange(e.target);
              }}
              value={`$${newGoal ?? 0}`}
            />
          </View>
          <View>
            <Dropdown
              data={data}
              labelField={'name'}
              valueField={'frequency'}
              onChange={setNewPeriod}
              value={newPeriod}
            />
            <Text>{period}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditCategoryScreen;
