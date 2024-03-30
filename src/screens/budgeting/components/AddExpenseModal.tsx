import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import useBudgeting from '../../../lib/budgeting/budgeting';
import { AddExpenseType } from '../../../lib/budgeting/expense';

const addExpense = async (
  {
    label,
    categoryId,
    amount,
    date,
  }: Partial<Omit<AddExpenseType, 'categoryId' | 'amount'>> &
    Pick<AddExpenseType, 'categoryId' | 'amount'>,
  addExpenseFn: (_: AddExpenseType) => void,
) => {
  const now = new Date();
  await addExpenseFn({
    label: label ?? '',
    categoryId,
    amount,
    date: date ?? now,
  });
};

type Props = {
  categoryId: number;
  categoryName: string;
  showModal: boolean;
  setShowModal: (_: boolean) => void;
  onDismiss: () => void;
};
const AddExpenseModal = (props: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [formattedAmount, setFormattedAmount] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const db = useBudgeting();
  const resetFields = () => {
    setAmount(0);
    setFormattedAmount('');
    setDesc('');
    setLoading(false);
  };

  const format = (newAmt: number) => {
    return `$${newAmt.toFixed(2)}`;
  };
  const onUpdate = (text: string) => {
    if (text && text !== '$' && text !== '') {
      const newAmt = parseFloat(text?.match('\\d+(\\.\\d{1,2})?')![0] ?? 0);
      setAmount(newAmt);
      if (text.endsWith('.')) setFormattedAmount(`$${newAmt}.`);
      else setFormattedAmount(`$${newAmt}`);
    } else {
      setAmount(0);
      setFormattedAmount('$');
    }
  };
  const onDismiss = () => {
    Keyboard.dismiss();
    resetFields();
    if (props.onDismiss) {
      props.onDismiss();
    }
    props.setShowModal(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    await addExpense(
      { categoryId: props.categoryId, amount, label: desc },
      db.addExpense,
    );
    setLoading(false);
    onDismiss();
  };

  return (
    <ReactNativeModal
      isVisible={props.showModal}
      style={{ alignItems: 'center' }}
      onDismiss={onDismiss}
      onBackdropPress={onDismiss}
      useNativeDriverForBackdrop
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ width: 350 }}
          className=" bg-gray-800 rounded-3xl items-center flex px-8 py-4"
        >
          <Text
            className={'font-semibold text-center text-3xl text-white'}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {props.categoryName}
          </Text>
          <TextInput
            className={
              'text-center font-medium text-4xl h-[60px] w-[150px] border-b-4 border-white'
            }
            inputMode={'decimal'}
            autoComplete="off"
            placeholder="$0"
            onChangeText={onUpdate}
            value={formattedAmount}
            onFocus={() => {
              if (amount == 0) setFormattedAmount('$');
            }}
            style={{ color: 'white' }}
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
          <View className="h-[50px] bg-emerald-400 rounded-lg justify-center p-2 mt-4 w-[200px]">
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
                Add Expense
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
        </View>
      </TouchableWithoutFeedback>
    </ReactNativeModal>
  );
};
export default AddExpenseModal;
