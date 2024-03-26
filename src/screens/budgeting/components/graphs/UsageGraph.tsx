import { useFont } from '@shopify/react-native-skia';
import dayjs from 'dayjs';
import { ResultSet } from 'expo-sqlite';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { CartesianChart, Line } from 'victory-native';
// @ts-expect-error importing ttf file
import inter from '../../../../assets/fonts/Inter-Medium.ttf';
import { DatabaseContext } from '../../../../lib/DatabaseProvider';
import { getRunningTotal } from '../../../../lib/budgeting/queries';
import { DisplayType } from '../../BudgetingHome';

type UsageGraphProps = {
  displayData: { startDate: Date; endDate: Date };
  displayType: DisplayType;
  displayPeriod: number;
  goalTotal: number;
};

type GraphDataType = {
  date: number;
  total: number;
  goal: number;
};

const UsageGraph = ({
  displayData,
  displayType,
  displayPeriod,
  goalTotal,
}: UsageGraphProps) => {
  const font = useFont(inter, 12);
  const db = useContext(DatabaseContext);
  const [graphData, setGraphData] = useState<GraphDataType[]>([]);

  const getDateNumber = useCallback(
    (date: Date) => {
      if (displayType === 'monthly') {
        return parseInt(dayjs(date).format('YYYYMMDD'));
      }
      return 0;
    },
    [displayType],
  );

  const domain: { x: [number, number] } = useMemo(() => {
    const startDate = getDateNumber(displayData.startDate);
    const endDate = getDateNumber(displayData.endDate);
    return { x: [startDate, endDate] };
  }, [displayData]);

  const formatData = (arr: ResultSet): GraphDataType[] => {
    return arr.rows.map((item) => {
      const date = new Date(item.date);
      const dateNumber = getDateNumber(date);
      return {
        date: dateNumber,
        total: item.total,
        goal: goalTotal,
      };
    });
  };

  useEffect(() => {
    db.transactionAsync(async (tx) => {
      const catData = await getRunningTotal(
        tx,
        displayData.startDate,
        displayData.endDate,
      );
      const initial = {
        date: getDateNumber(displayData.startDate),
        total: 0,
        goal: goalTotal,
      };
      const final: GraphDataType = {
        date: getDateNumber(displayData.endDate),
        goal: goalTotal,
        // @ts-expect-error for the red line
        total: undefined,
      };
      if (catData) {
        const formatted = formatData(catData);
        setGraphData([initial, final, ...formatted]);
      }
    });
  }, [displayData, goalTotal]);

  const xLabel = useMemo(() => {
    if (displayType === 'monthly') {
      return dayjs().subtract(displayPeriod, 'months').format('MMMM');
    }
    return dayjs().subtract(displayPeriod, 'months').format('MMMM');
  }, [displayType, displayPeriod]);

  return (
    <View className="flex-1 h-[40vh] ">
      <View className="flex-1 px-3 align-baseline pr-8">
        <CartesianChart
          data={graphData}
          domain={domain}
          xKey={'date'}
          yKeys={['total', 'goal']}
          axisOptions={{
            lineColor: 'white',
            labelColor: 'white',
            font,
            tickCount: 6,
            formatXLabel: (label) => {
              const l = label.toString();
              const day = parseInt(l.substring(l.length - 2));
              return `${day}`;
            },
            formatYLabel: (label) => {
              return `$${label}`;
            },
          }}
        >
          {({ points }) => {
            // console.log(points.goal);
            return (
              <>
                <Line
                  points={points.goal}
                  color="red"
                  strokeWidth={2}
                  curveType={'linear'}
                />
                <Line
                  points={points.total}
                  color="white"
                  strokeWidth={3}
                  curveType={'bumpX'}
                />
              </>
            );
          }}
        </CartesianChart>
      </View>
      <Text className="flex-0 text-white text-lg text-center">{xLabel}</Text>
    </View>
  );
};
export default UsageGraph;
