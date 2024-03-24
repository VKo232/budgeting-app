import { useFont } from '@shopify/react-native-skia';
import dayjs from 'dayjs';
import { ResultSet } from 'expo-sqlite';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { CartesianChart, Line } from 'victory-native';
import inter from '../../../../assets/fonts/Inter-Medium.ttf';
import { DatabaseContext } from '../../../../lib/DatabaseProvider';
import { getRunningTotal } from '../../../../lib/budgeting/queries';
import { DisplayType } from '../../BudgetingHome';

type UsageGraphProps = {
  displayData: { startDate: Date; endDate: Date };
  displayType: DisplayType;
  xLabel: string;
};

type GraphDataType = {
  date: number;
  total: number;
};

const UsageGraph = ({ displayData, displayType, xLabel }: UsageGraphProps) => {
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

  const domain = useMemo(() => {
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
      const initial = { date: getDateNumber(displayData.startDate), total: 0 };
      if (catData) {
        const formatted = formatData(catData);
        console.log(catData?.rows);
        setGraphData([initial, ...formatted]);
      }
    });
  }, [displayData]);
  return (
    <View className="flex-1 h-[40vh] ">
      <View className="flex-1 px-3">
        <CartesianChart
          data={graphData}
          domain={domain}
          xKey={'date'}
          yKeys={['total']}
          axisOptions={{
            lineColor: 'white',
            labelColor: 'white',
            font,
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
            return (
              <Line
                points={points.total}
                color="white"
                strokeWidth={3}
                curveType={'bumpX'}
              />
            );
          }}
        </CartesianChart>
      </View>
      <Text className="text-white text-lg text-center">{xLabel}</Text>
    </View>
  );
};
export default UsageGraph;
