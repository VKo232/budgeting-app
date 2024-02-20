import { View } from 'react-native';

type Props = {
  color: string;
  total: number;
  current: number;
};

const Bar = ({ color, total, current }: Props) => {
  const flexCover = total - current;

  return (
    <View className="flex-row rounded-xl h-3 w-24 overflow-hidden">
      <View style={{ backgroundColor: color, flex: current }} />
      <View style={{ backgroundColor: color, flex: flexCover }} />
    </View>
  );
};

const GoalBar = ({ color, total, current }: Props) => {
  const barColor = current > total ? 'red' : color;
  const barTotal = () => {
    if (current > total) {
      return total;
    } else if (total <= 0) {
      return total;
    }
    return total;
  };

  return (
    <View className="flex-row">
      <Bar color={barColor} total={barTotal()} current={current} />
    </View>
  );
};

export default GoalBar;
