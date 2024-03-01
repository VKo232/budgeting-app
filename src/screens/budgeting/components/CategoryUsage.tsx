import clsx from 'clsx';
import { ResultSet } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import useBudgeting from '../../../lib/budgeting/budgeting';
import { GetAllCategoriesResult } from '../../../lib/budgeting/queries';
import CategoryUsageBar from './CategoryUsageBar';

type CategoryUsageProps = {
  showModal?: (_: boolean) => void;
};

const CategoryUsage = ({ showModal = () => {} }: CategoryUsageProps) => {
  const [categoryData, setCategoryData] = useState<GetAllCategoriesResult[]>(
    [],
  );
  const shouldShowModal = () => {
    showModal(true);
  };

  const { getAllCategorySpending } = useBudgeting();
  useEffect(() => {
    getAllCategorySpending((results: ResultSet | null) => {
      setCategoryData((results?.rows as GetAllCategoriesResult[]) ?? []);
    });
  }, []);

  return (
    <View className={clsx('flex-1', 'flex-col', 'justify-between')}>
      <FlatList<GetAllCategoriesResult>
        style={{ height: 200, flex: 1, flexGrow: 1 }}
        data={categoryData}
        keyExtractor={(item) => item.id.toString()}
        snapToAlignment="start"
        decelerationRate={'fast'}
        renderItem={({ item }: { item: GetAllCategoriesResult }) => {
          return (
            <CategoryUsageBar
              onPress={shouldShowModal}
              label={item.name}
              {...item}
            />
          );
        }}
      />
    </View>
  );
};

export default CategoryUsage;
