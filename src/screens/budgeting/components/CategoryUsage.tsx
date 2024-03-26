import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { z } from 'zod';
import { BarColor } from '../../../lib/budgeting/category';
import {
  GetAllCategoriesResult,
  getAllCategorySpending,
} from '../../../lib/budgeting/queries';
import { DatabaseContext } from '../../../lib/DatabaseProvider';
import { BudgetingStackParamList } from '../../../navigation/navigation';
import { Routes } from '../../../navigation/routeConstants';
import { AddModalProps } from '../BudgetingHome';
import CategoryUsageBar from './CategoryUsageBar';

type CategoryUsageProps = {
  showModal?: (_: boolean) => void;
  setShowModalProps?: (_: AddModalProps) => void;
  displayData: { startDate: Date; endDate: Date };
};
const dataSchema = z.array(
  z.object({
    categoryId: z.number(),
    color: z.custom<BarColor>(),
    goal: z.number(),
    id: z.number(),
    name: z.string(),
    period: z.number(),
    total: z.number(),
  }),
);

const CategoryUsage = ({
  showModal = () => {},
  setShowModalProps = () => {},
  displayData,
}: CategoryUsageProps) => {
  const [categoryData, setCategoryData] = useState<GetAllCategoriesResult[]>(
    [],
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<BudgetingStackParamList>>();
  const shouldShowModal = (props: AddModalProps) => {
    setShowModalProps(props);
    showModal(true);
  };

  const db = useContext(DatabaseContext);

  useEffect(() => {
    db.transactionAsync(async (tx) => {
      const catData = await getAllCategorySpending(
        tx,
        displayData.startDate,
        displayData.endDate,
      );
      if (catData?.rows) {
        setCategoryData(
          dataSchema.parse(catData?.rows) satisfies GetAllCategoriesResult[],
        );
      }
    });
  }, [displayData]);
  return (
    <View
      className={clsx('flex-1 flex-col ', 'justify-between', 'bg-gray-800')}
    >
      <FlatList<GetAllCategoriesResult>
        style={{ height: 200, flex: 1, flexGrow: 1 }}
        data={categoryData}
        keyExtractor={(item) => item.id.toString()}
        snapToAlignment="start"
        decelerationRate={'fast'}
        renderItem={({ item }: { item: GetAllCategoriesResult }) => {
          return (
            <CategoryUsageBar
              onPress={() => {
                navigation.navigate(Routes.BudgetingCategorySpend, {
                  categoryId: item.categoryId,
                });
              }}
              onAdd={shouldShowModal}
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
