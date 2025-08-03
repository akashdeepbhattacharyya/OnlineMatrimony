import { Option } from '@/src/resources/form';
import { useState } from 'react';
import { YStack, XStack, ViewProps } from 'tamagui';
import { Text } from './Text';
import { Divider } from './Divider';
import { CheckBox } from './CheckBox';
import { TouchableOpacity } from 'react-native';

type Props<T> = {
  options: Option<T>[];
  onChange: (selected: T[]) => void;
  selected?: T[];
} & ViewProps;

export function MultiSelectList<T>({
  options,
  onChange,
  selected = [],
  ...props
}: Props<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>(selected);

  console.log('MultiSelectList: Selected options:', selectedItems);

  const toggleItem = (item: T) => {
    const options = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];
    setSelectedItems(options);
    onChange(options);
  };

  return (
    <YStack {...props}>
      {options.map((option, index) => (
        console.log(
          'Rendering option:',
          option.value,
          selectedItems.includes(option.value),
        ),
        <YStack key={index}>
          <TouchableOpacity onPress={() => toggleItem(option.value)}>
            <XStack
              justifyContent="space-between"
              alignItems="center"
              paddingVertical={'$2.5'}
              paddingTop={'$3.5'}
            >
              <Text font="heading" size="small">
                {option.label}
              </Text>
              <CheckBox selected={selectedItems.includes(option.value)} />
            </XStack>
            <Divider width={'100%'} />
          </TouchableOpacity>
        </YStack>
      ))}
    </YStack>
  );
}
