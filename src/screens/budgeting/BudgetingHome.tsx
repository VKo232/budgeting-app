import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddExpenseModal from './components/AddExpenseModal';
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

export type AddModalProps = { categoryId: number; categoryName: string };

const BudgetingHome = () => {
  const { top } = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [addModalProps, setAddModalProps] = useState<AddModalProps>({
    categoryId: 0,
    categoryName: '',
  });
  return (
    <View
      style={{ paddingTop: top }}
      className={'text-textPrimary bg-gray-700 flex-1'}
    >
      <AddExpenseModal
        showModal={showModal}
        setShowModal={setShowModal}
        {...addModalProps}
      />
      <TitleBar />
      <Graph />
      <CategoryUsage
        showModal={setShowModal}
        setShowModalProps={setAddModalProps}
      />
    </View>
  );
};

export default BudgetingHome;
