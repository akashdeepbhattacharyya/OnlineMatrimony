import { TouchableOpacity } from 'react-native';
import { Text } from '../common/Text';
import { Filter } from '@/resources/filter';

export const FilterItem = ({
  filter,
  isActive,
  onPress,
}: {
  filter: Filter;
  isActive: boolean;
  onPress: (filter: Filter) => void;
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
        {filter}
      </Text>
    </TouchableOpacity>
  );
};
