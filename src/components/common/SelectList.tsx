import { Option } from '@/src/resources/form';
import { useState } from 'react';
import { YStack, XStack, ViewProps, getToken } from 'tamagui';
import { Text } from './Text';
import { Divider } from './Divider';
import { CheckBox } from './CheckBox';
import { TouchableOpacity } from 'react-native';

type Props<T> = {
  options: Option<T>[];
  onChange: (selected: T) => void;
  selected?: T;
} & ViewProps;

export function SelectList<T>({
  options,
  onChange,
  selected,
  ...props
}: Props<T>) {
  const [selectedItem, setSelectedItem] = useState<T | undefined>(selected);

  const toggleItem = (item: T) => {
    setSelectedItem(item);
    onChange(item);
  };

  return (
    <YStack {...props}>
      {options.map((option, index) => (
        <YStack key={index}>
          <TouchableOpacity onPress={() => toggleItem(option.value)}>
            <XStack
              justifyContent="space-between"
              alignItems="center"
              paddingVertical={'$2.5'}
              paddingTop={'$3.5'}
            >
              <Text
                font="heading"
                size="small"
                color={getToken('$color.white')}
              >
                {option.label}
              </Text>
              <CheckBox selected={selectedItem === option.value} />
            </XStack>
            <Divider width={'100%'} />
          </TouchableOpacity>
        </YStack>
      ))}
    </YStack>
  );
}
