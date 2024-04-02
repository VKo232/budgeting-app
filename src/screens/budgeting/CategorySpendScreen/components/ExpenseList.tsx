import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { PanResponder, SectionList, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useBudgeting from '../../../../lib/budgeting/budgeting';
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
        while (newDate < sectionDate && ago < 2000) {
          ago++;
          sectionDate = periodStartDate(period, ago);
          prev.push({ data: [], datePeriod: sectionDate });
        }
        prev[prev.length - 1].data.push({ ...item, date: newDate });
        return prev;
      },
      [{ data: [], datePeriod: new Date() }],
    );
  };
  const updateExpenses = useCallback(() => {
    db.transactionAsync(async (tx) => {
      getAllExpenses(tx, categoryId).then((val) =>
        setHistory(formatQueryToSections(val?.rows as ExpenseResultType[])),
      );
    });
  }, [categoryId]);

  useFocusEffect(updateExpenses);

  const { removeExpense } = useBudgeting();

  const handleDeleteItem = (id: number) => {
    removeExpense(id);
    updateExpenses();
  };

  const RenderItem = ({ item }: { item: ExpenseType; index: number }) => {
    const offset = useSharedValue(0);
    const LEFT_BOUNDARY = -160;
    const RIGHT_BOUNDARY = 160;

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value }],
    }));

    const advanceBy = (position: number) => {
      const previousOffset = offset.value;
      if (previousOffset < LEFT_BOUNDARY && position <= 0) return;
      if (previousOffset > RIGHT_BOUNDARY && position >= 0) return;
      if (Math.abs(position) > 0) {
        const newOffset = Math.atan(position) * 40;
        offset.value = withSpring(newOffset, {
          restDisplacementThreshold: 1,
          restSpeedThreshold: 1,
        });
      }
    };

    const panResponder = (id: number) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          advanceBy(gestureState.dx);
        },
        onPanResponderRelease: (_e, gestureState) => {
          if (gestureState.dx >= 250) {
            handleDeleteItem(id);
          } else {
            offset.value = withSpring(0, {
              restDisplacementThreshold: 5,
              restSpeedThreshold: 5,
            });
          }
        },
        onPanResponderEnd: () => {
          offset.value = withSpring(0, {
            restDisplacementThreshold: 5,
            restSpeedThreshold: 5,
          });
        },
      });
    };
    return (
      <View {...panResponder(item.id).panHandlers} style={[]}>
        <Animated.View style={[animatedStyles]}>
          <View className="flex-row justify-between py-5 px-4 ">
            <Text className="text-white">{item.date.toLocaleDateString()}</Text>
            <Text className="text-white">{item.label}</Text>
            <Text className="text-white">${item.amount.toFixed(2)}</Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={{ width: '100%' }}>
      <SectionList<ExpenseType, SectionedData>
        sections={history}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => (
          <View className="mx-4 bg-slate-600 h-[1px]"></View>
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
  return (
    <View style={{ backgroundColor: 'rgb(75 85 99)' }}>
      <View className="bg-white h-[1px]"></View>
      <Text className="p-2 text-white ">
        {section.datePeriod.toDateString()}
      </Text>
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

export default ExpenseList;
