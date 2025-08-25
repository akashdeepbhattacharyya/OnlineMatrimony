import { TouchableOpacity } from 'react-native';
import { Text } from './Text';

export const FilterItem = <T,>({
  filter,
  filterLabel,
  isActive,
  onPress,
}: {
  filter: T;
  filterLabel: string;
  isActive: boolean;
  onPress: (filter: T) => void;
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(filter)}>
      <Text
        theme={isActive ? 'chat_filter_active' : 'chat_filter_inactive'}
        font="heading"
        paddingHorizontal="$4"
        paddingVertical={'$2'}
        backgroundColor={'$background'}
        color={'$color'}
        borderWidth={0.5}
        borderColor={'$borderColor'}
        borderRadius={'$6'}
      >
        {filterLabel}
      </Text>
    </TouchableOpacity>
  );
};
