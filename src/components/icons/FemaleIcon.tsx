import Svg, { Path, SvgProps } from 'react-native-svg';
import { View } from 'tamagui';

type Props = {
  selected: boolean;
  enabled?: boolean;
} & SvgProps;

export const FemaleIcon = ({ selected, enabled, ...props }: Props) => {
  return (
    <View alignItems="center">
      <Svg width={23} height={35} fill="none" viewBox="0 0 23 35" {...props}>
        <Path
          d="M11.501 22.653C17.3 22.653 22.001 17.9519 22.001 12.153C22.001 6.35396 17.3 1.65295 11.501 1.65295C5.70199 1.65295 1.00098 6.35396 1.00098 12.153C1.00098 17.9519 5.70199 22.653 11.501 22.653Z"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={selected ? '#F85F5F' : enabled ? '#FFFFFF' : '#A9A9A9'}
        />
        <Path
          d="M11.501 22.653V33.653M16.001 28.7641H7.00098"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={selected ? '#F85F5F' : enabled ? '#FFFFFF' : '#A9A9A9'}
        />
      </Svg>
    </View>
  );
};
