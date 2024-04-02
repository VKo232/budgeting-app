import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { addExpense } from '../../../lib/budgeting/expense';
import { DatabaseContext } from '../../../lib/DatabaseProvider';
import { BudgetingStackParamList } from '../../../navigation/navigation';

type Props = NativeStackScreenProps<
  BudgetingStackParamList,
  'BudgetingAddExpenseScreen'
>;

const AddExpenseScreen = ({ navigation, route }: Props) => {
  const { categoryName, categoryId } = route.params;
  const [amount, setAmount] = useState<number>(0);
  const [formattedAmount, setFormattedAmount] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [txDate, setTxDate] = useState<Date>(new Date());
  const db = useContext(DatabaseContext);

  const format = (newAmt: number) => {
    return `$${newAmt.toFixed(2)}`;
  };
  const onUpdate = (text: string) => {
    if (text && text !== '$' && text !== '') {
      const newAmt = parseFloat(text?.match('\\d+(\\.\\d{1,2})?')![0] ?? 0);
      setAmount(newAmt);
      if (text.endsWith('.')) {
        setFormattedAmount(`$${newAmt}.`);
      } else {
        setFormattedAmount(`$${newAmt}`);
      }
    } else {
      setAmount(0);
      setFormattedAmount('');
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    await db.transactionAsync(async (tx) => {
      await addExpense(tx, { categoryId, amount, label: desc, date: txDate });
    });
    setLoading(false);
    navigation.pop();
  };

  const { top } = useSafeAreaInsets();
  return (
    <View
      className="items-center flex-1 px-8 py-4 bg-gray-900"
      style={{ paddingTop: top }}
    >
      <Header name={categoryName} navigation={navigation} />

      <CalendarPicker
        selectedDayColor="rgb(52 211 153)"
        onDateChange={setTxDate}
        textStyle={{ color: 'white' }}
        enableDateChange
        selectedStartDate={txDate}
        previousTitle="Prev"
      />
      <KeyboardAvoidingView
        style={{ width: '100%' }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      >
        <TextInput
          className={
            'text-center font-medium text-4xl h-[60px] border-b-4 border-white'
          }
          inputMode={'decimal'}
          autoComplete="off"
          placeholder="$0"
          onChangeText={onUpdate}
          value={formattedAmount}
          onFocus={() => {
            if (amount == 0) setFormattedAmount('$');
          }}
          style={{
            color: 'white',
            width: 200,
            alignSelf: 'center',
          }}
          placeholderTextColor={'white'}
          onBlur={() => setFormattedAmount(format(amount))}
          blurOnSubmit
        />

        <TextInput
          className="bg-white mt-4 rounded-md self-stretch px-2 font-medium text-base"
          placeholder="Description"
          numberOfLines={1}
          onChangeText={setDesc}
        />
        <View
          className="h-[50px] bg-emerald-400 rounded-lg p-2 mt-4 w-[200px]"
          style={{ alignSelf: 'flex-end' }}
        >
          <TouchableOpacity
            disabled={!amount || amount <= 0}
            onPress={onSubmit}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: !amount || amount <= 0 ? 0.4 : 1,
            }}
          >
            <Text className=" text-center font-bold text-white text-lg flex-1">
              Confirm
            </Text>
            <View
              style={{
                marginLeft: 0,
                position: 'absolute',
                right: 5,
              }}
            >
              {loading ? <ActivityIndicator color={'grey'} /> : null}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const Header = ({
  name,
  navigation,
}: {
  name: string;
  navigation: NativeStackNavigationProp<
    BudgetingStackParamList,
    'BudgetingAddExpenseScreen',
    undefined
  >;
}) => {
  return (
    <View className="flex-row justify-between mb-10">
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        onPress={() => navigation.pop()}
      >
        <Text className="text-blue-400 text-xl">Back</Text>
      </TouchableOpacity>

      <Text className="color-white font-semibold text-4xl text-center flex-1">
        {name[0].toUpperCase() + name.slice(1)}
      </Text>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default AddExpenseScreen;
