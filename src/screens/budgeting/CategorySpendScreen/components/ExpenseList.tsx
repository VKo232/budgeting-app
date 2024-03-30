import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { CategoryPeriod } from '../../../../lib/budgeting/category';
import {
  ExpenseResultType,
  ExpenseType,
} from '../../../../lib/budgeting/expense';
import { getAllExpenses } from '../../../../lib/budgeting/queries';
import { DatabaseContext } from '../../../../lib/DatabaseProvider';
import { dbDateToDate, periodStartDate } from '../../../../lib/dbUtils';

type SectionedData = { data: ExpenseType[]; datePeriod: Date };

type Props = { categoryId: number; period: CategoryPeriod };

const ExpenseList = ({ categoryId, period }: Props) => {
  const db = useContext(DatabaseContext);
  const [history, setHistory] = useState<SectionedData[]>([]);

  const formatQueryToSections = (
    rows: ExpenseResultType[],
  ): SectionedData[] => {
    let sectionDate = periodStartDate(period);
    let ago = 0;
    return rows.reduce(
      (prev: SectionedData[], item) => {
        const newDate = dbDateToDate(item.date);
        while (newDate < sectionDate && ago < 4) {
          ago++;
          console.log(period, ago);
          sectionDate = periodStartDate(period, ago);
          console.log(newDate, sectionDate);
          prev.push({ data: [], datePeriod: sectionDate });
        }
        prev[prev.length - 1].data.push({ ...item, date: newDate });
        return prev;
      },
      [{ data: [], datePeriod: new Date() }],
    );
  };

  useFocusEffect(
    useCallback(() => {
      db.transactionAsync(async (tx) => {
        getAllExpenses(tx, categoryId).then((val) =>
          setHistory(formatQueryToSections(val?.rows as ExpenseResultType[])),
        );
      });
    }, [categoryId]),
  );

  return (
    <View>
      <SectionList<ExpenseType, SectionedData>
        sections={history}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => (
          <View className="w-full bg-slate-400 h-[1px]"></View>
        )}
        renderItem={RenderItem}
        renderSectionHeader={RenderSectionHeader}
      />
    </View>
  );
};

const RenderSectionHeader = ({
  section,
}: {
  section: { datePeriod: Date };
}) => {
  console.log(section);
  return (
    <View>
      <Text className="p-2 text-white">
        {section.datePeriod.toLocaleDateString()}
      </Text>
    </View>
  );
};

const RenderItem = ({ item }: { item: ExpenseType; index: number }) => {
  console.log('render item', item);
  return (
    <View className="flex-row justify-between">
      <Text className="text-white">{item.date.toDateString()}</Text>
      <Text className="text-white">{item.label}</Text>
      <Text className="text-white">${item.amount.toFixed(2)}</Text>
    </View>
  );
};

const ListEmptyComponent = () => {
  return (
    <View>
      <Text
        className="text-white text-xl text-center mt-10"
        style={{ paddingLeft: 20 }}
      >
        Nothing to show
      </Text>
    </View>
  );
};
const ListHeaderComponent = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <View className="flex-row justify-between px-6">
        <Text className="text-2xl text-white">Expense List</Text>
        <TouchableOpacity>
          <Text className="text-2xl text-blue-400">Add</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full mt-2 bg-slate-400 h-[1px]"></View>
    </View>
  );
};

export default ExpenseList;
