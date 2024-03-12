import clsx from 'clsx';
import { View, ViewProps } from 'react-native';
import { colors } from '../../../common/colors';
import { BarColor } from '../../../lib/budgeting/category';

type Props = ViewProps & {
  color: BarColor;
  percentage: number;
};

const GoalBar = ({ color, percentage, className, style, ...props }: Props) => {
  return (
    <View
      className={clsx('flex-row rounded-xl overflow-hidden', className)}
      {...props}
      style={[style]}
    >
      <View
        style={{
          backgroundColor: colorMap[color].solid,
          width: `${percentage}%`,
          height: '100%',
          position: 'absolute',
          zIndex: 10,
        }}
      />
      <View
        style={{
          backgroundColor: colorMap[color].faded,
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
    </View>
  );
};

const colorMap: Record<BarColor, { solid: string; faded: string }> = {
  green: {
    solid: colors.green[500],
    faded: colors.green[200],
  },
  blue: {
    solid: colors.blue[500],
    faded: colors.blue[200],
  },
  purple: {
    solid: 'rgb(168 85 247)',
    faded: 'rgb(233 213 255)',
  },
  orange: {
    solid: 'rgb(245 158 11)',
    faded: 'rgb(253 230 138)',
  },
  red: {
    solid: colors.red[500],
    faded: colors.red[200],
  },
};

export default GoalBar;
