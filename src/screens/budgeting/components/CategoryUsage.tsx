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
import { BottomTabsParamList } from '../../../navigation/navigation';
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
    mainCategory: z.number(),
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
    useNavigation<NativeStackNavigationProp<BottomTabsParamList>>();
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
      className={clsx('flex-1 flex-col ', 'justify-between', 'bg-gray-900')}
    >
      <FlatList<GetAllCategoriesResult>
        style={{ height: 200, flex: 1, flexGrow: 1 }}
        data={categoryData}
        keyExtractor={(item) => item.id.toString()}
        snapToAlignment="start"
        decelerationRate={'fast'}
        ItemSeparatorComponent={() => (
          <View className="w-full bg-slate-400 h-[1px]"></View>
        )}
        renderItem={({ item }: { item: GetAllCategoriesResult }) => {
          return (
            <CategoryUsageBar
              onPress={() => {
                navigation.navigate(Routes.Budget, {
                  screen: Routes.BudgetingCategorySpend,
                  params: {
                    category: item,
                  },
                });
              }}
              onAdd={shouldShowModal}
              label={item.name}
              descriptor={`$${item.total} of $${item.goal}`}
              {...item}
            />
          );
        }}
      />
    </View>
  );
};

export default CategoryUsage;
